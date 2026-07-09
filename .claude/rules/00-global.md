# Global build rules (always loaded)

## Zero duplication
Before writing any new function, class, or helper: query the codebase-memory
graph (search_graph, then trace_path or impact on candidates). If something
similar exists, extend or reuse it. CI fails PRs above 3% duplicated lines.

## State files are the memory, chat is not
- Read `docs/build/BUILD-STATE.md` before starting anything.
- After finishing a subtask, update its `Now / Next / Blockers` sections.
- Append one line per change to `docs/build/CHANGELOG-AI.md`:
  `YYYY-MM-DD | T-xxx | file(s) | what changed | why`
- Any real choice (library, pattern, tradeoff) gets a row in
  `docs/build/DECISIONS.md`. If it is not written down, it did not happen.

## Definition of done for any task
1. Typecheck clean. 2. Tests green. 3. No new duplication.
4. State files updated. 5. Committed on the task branch with INTENT/VERIFY body.
