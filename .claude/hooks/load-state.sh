#!/usr/bin/env bash
# SessionStart hook. Whatever this prints becomes context Claude can see.
# Fires on startup, resume, clear, AND after compaction, so state survives all four.
set -u
ROOT="${CLAUDE_PROJECT_DIR:-.}"
STATE="$ROOT/docs/build/BUILD-STATE.md"
DEC="$ROOT/docs/build/DECISIONS.md"

echo "## Session bootstrap (auto-injected)"
echo "Branch: $(git -C "$ROOT" branch --show-current 2>/dev/null || echo 'no-git')"
git -C "$ROOT" status --short 2>/dev/null | head -8
echo
echo "### Recent commits"
git -C "$ROOT" log --oneline -5 2>/dev/null
echo
if [ -f "$STATE" ]; then
  echo "### BUILD-STATE.md (source of truth, read fully)"
  tail -c 6000 "$STATE"
else
  echo "### No BUILD-STATE.md yet. Create docs/build/BUILD-STATE.md before any work."
fi
echo
if [ -f "$DEC" ]; then
  echo "### Last decisions"
  tail -n 12 "$DEC"
fi
exit 0
