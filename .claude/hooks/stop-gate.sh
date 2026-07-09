#!/usr/bin/env bash
# Stop gate. Claude may not finish the turn while tests fail.
# Loop safety: honors stop_hook_active and caps attempts per session.
set -u
source "$(dirname "$0")/config.sh" 2>/dev/null || { TEST_CMD=""; STOP_MAX_ATTEMPTS=3; }

INPUT="$(cat)"
READ="$(printf '%s' "$INPUT" | python3 -c '
import json,sys
d=json.load(sys.stdin)
print("1" if d.get("stop_hook_active") else "0")
print(d.get("session_id","nosession")[:12])
' 2>/dev/null)" || exit 0

ACTIVE="$(printf '%s\n' "$READ" | sed -n 1p)"
SID="$(printf '%s\n' "$READ" | sed -n 2p)"
[ "$ACTIVE" = "1" ] && exit 0
[ -z "${TEST_CMD:-}" ] && exit 0

COUNTF="/tmp/claude-stopgate-$SID"
N=$(cat "$COUNTF" 2>/dev/null || echo 0)
if [ "$N" -ge "${STOP_MAX_ATTEMPTS:-3}" ]; then
  echo "stop-gate: attempt cap reached, letting session stop" >> \
    "${CLAUDE_PROJECT_DIR:-.}/.claude/logs/stopgate.log" 2>/dev/null
  exit 0
fi

OUT="$(eval "$TEST_CMD" 2>&1)"
if [ $? -ne 0 ]; then
  echo $((N+1)) > "$COUNTF"
  {
    echo "You are not done: the test suite is failing."
    echo "Fix the failures, update docs/build/BUILD-STATE.md, then finish."
    echo "$OUT" | tail -n 40
  } >&2
  exit 2
fi
rm -f "$COUNTF"
exit 0
