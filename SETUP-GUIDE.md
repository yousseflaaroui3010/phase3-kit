# SETUP GUIDE: Phase 3 + 4 Claude Code System
Plain words, short steps. Total setup time: about an hour.

## The idea in one paragraph
Words in a prompt are notes taped to the fridge. Claude reads them, then
sometimes ignores them. So this kit gives you four walls that do not
depend on Claude's mood: (1) small scoped instructions that load only
when needed, (2) local hooks that physically block or force actions,
(3) CI checks on every pull request, (4) rules on the git server itself,
which Claude cannot touch. Plus one shared memory: a code graph for the
codebase, and three small files for state, decisions, and changes.
Anthropic's own docs say it plainly: CLAUDE.md and rules are context, not
enforcement; to actually block an action, use a PreToolUse hook.

## Step 1: Copy the kit into your repo
- Copy everything in this kit into your project root (keep the folder
  structure: `.claude/`, `docs/`, `.github/`, `CLAUDE.md`, `.mcp.json`).
- Make the hook scripts executable:
  `chmod +x .claude/hooks/*.sh`
- Commit all of it. The whole team gets the same walls.
- Windows note: these hooks are bash + python3 scripts. On Windows, run
  Claude Code inside WSL2 so they work as-is.

## Step 2: Fill in the blanks (10 minutes)
- `CLAUDE.md`: replace every TODO_ with your real commands and product line.
- `.claude/hooks/config.sh`: set TYPECHECK_CMD and TEST_CMD to your real
  commands. Empty string = that check is skipped until you set it.
- `.github/workflows/gate.yml`: adjust the two TODO command lines.
- `.claude/rules/backend.md` and `frontend.md`: fix the `paths:` globs to
  match your real folder names. Keep the quotes around each glob; unquoted
  globs silently fail to parse. Keep path-scoped rules at project level
  (there is a known bug where user-level `~/.claude/rules/` ignores paths).

## Step 3: Install the code map (this fixes "Claude forgets my codebase")
This is a graph index of your whole repo: every function, class, call
chain. Claude asks the map instead of reading folders file by file.
- Tool: codebase-memory-mcp (open source, MIT, single binary, runs fully
  on your machine, no API key).
- Easiest install: open Claude Code in the repo and say
  "Install https://github.com/DeusData/codebase-memory-mcp and configure
  it for this project". Or run their setup script:
  `curl -fsSL https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/scripts/setup.sh | bash`
- The kit's `.mcp.json` already points at the binary name; if you install
  to a custom path, put the full path in the `command` field.
- Restart Claude Code, run `/mcp`, confirm the server is listed with its
  tools. Then say "Index this project".
- Correction to your earlier notes: `npm install -g
  @modelcontextprotocol/server-memory` is a DIFFERENT tool (a generic
  note-memory server). It does not index code. Do not use it for this.
- Honest numbers: the vendor's "120x fewer tokens" is a best-case
  microbenchmark. The authors' own paper measured about 10x fewer tokens
  with a small quality dip vs full file reading, and an independent test
  saw roughly 2-3x on a real workflow. Still a big win; just set
  expectations at 2-10x, not 100x.

## Step 4: Verify the walls are up (5 minutes)
Open Claude Code in the repo and run:
- `/hooks` : you should see PreToolUse, PostToolUse, Stop, PreCompact,
  SessionStart wired.
- `/memory` : CLAUDE.md and the unscoped rules should be listed. Open a
  backend file, run `/memory` again, backend.md should appear.
- `/agents` : b1-b4 and o1-o4 should be listed.
- Test a wall: ask Claude to run `git commit --no-verify -m test`.
  The guard must block it and say why.

## Step 5: Lock the git server (the wall Claude can never touch)
On GitHub.com:
- Repo Settings -> Rules -> Rulesets -> new ruleset on `main`:
  block direct pushes, require a pull request, require the `gate` status
  checks to pass, block force pushes.
- The kit's `.github/workflows/gate.yml` provides those checks:
  typecheck, tests, INTENT commit-body check, 3% duplication gate (jscpd),
  and secret scanning.
- Precision on your notes: true `pre-receive` server hooks exist only on
  GitHub Enterprise Server (or self-hosted GitLab/Gitea). On regular
  GitHub.com, rulesets + required status checks are the equivalent wall,
  and they are enough: Claude cannot merge anything that fails CI.

## Step 6 (optional): Isolation upgrades
- Git worktrees: one worktree per task
  (`git worktree add ../proj-T-001 task/T-001-slug`) keeps agent chaos out
  of your main checkout. Cheap and local.
- E2B sandboxes: cloud microVMs for running untrusted test code. Nice to
  have; a worktree plus CI covers most solo/team setups. Add E2B later if
  agents start running risky scripts.
- Keep MCP servers to a minimum. Every connected server's tool list eats
  context in every session. The graph server (and maybe E2B) is enough.

## Step 7: Start Phase 3
Drop the signed Phase 2 pack into `docs/phase2/`, then paste
`PHASE3-KICKOFF-PROMPT.md` into Claude Code. It will audit the pack,
build the task plan, wait for your approval, then run the loop.

---

# RISK PLAYBOOK (the part most setups skip)

## Risk 1: /compact eats details mid-task
What survives a compact, by design:
- Root CLAUDE.md is re-read from disk and re-injected after compaction.
- The SessionStart hook fires again (compaction counts as a session
  source) and re-injects BUILD-STATE.md, branch, and recent commits.
- The PreCompact hook backs up the raw transcript to `.claude/backups/`
  and stamps BUILD-STATE.md so the next context knows it happened.
Your rule of thumb: if it matters, it lives in a file or a commit, never
only in chat. For long builds, prefer finishing a task, then `/clear` and
starting fresh, over trusting a compact summary.

## Risk 2: session or usage limit hits mid-task
- Tasks are sized under an hour on purpose: smaller than any limit window.
- Commit every green state. A green commit is a save point; worst case
  you lose minutes, not hours.
- Resume with `claude --continue` (or `--resume`). SessionStart re-runs
  and re-injects the state. The orchestrator's interruption protocol says:
  read BUILD-STATE, check `git status` on the task branch, continue from
  the "Where exactly" line. Never rebuild a task blind.

## Risk 3: Claude bypasses local checks
- The guard hook blocks `--no-verify`, force pushes, hook-path edits,
  HUSKY=0 / SKIP=, and edits to `.claude/hooks/` or settings.
- Assume a clever agent can still find a path around anything local.
  That is fine: the server ruleset + CI is the wall that holds. Local
  hooks exist to catch problems in seconds instead of at PR time.

## Risk 4: infinite hook loops burning tokens
- The Stop gate honors `stop_hook_active` and caps itself at 3 pushbacks
  per session (see config.sh), then lets go and logs it. Watch
  `.claude/logs/stopgate.log` if sessions feel stuck.

## Risk 5: memory drift
- Claude Code also keeps its own "auto memory" notes per project. Review
  them now and then via `/memory` and delete anything wrong; stale memory
  is worse than no memory.
- Same for BUILD-STATE.md: the orchestrator prunes Done items weekly so
  the file stays small enough to inject whole.

## Risk 6: duplicate and redundant code
Three layers catch it: agents must query the graph before writing
anything new (rule + prompt), b1 re-checks at review, and CI fails any PR
over 3% duplicated lines. If one layer sleeps, the next one catches it.

## Daily rhythm (2 minutes to read, saves hours)
- Start: open Claude Code, state auto-loads, confirm the Now task.
- Work: one task, one branch, commits at every green step.
- Handoff: b4 tests in isolation, b1 reviews and squash-merges.
- End of day: b1 squashes stragglers; you skim CHANGELOG-AI.md and
  DECISIONS.md like a site foreman reading the shift log.
