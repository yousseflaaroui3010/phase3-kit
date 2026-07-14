#!/usr/bin/env bash
# One place to set your project commands. All hooks source this file.
# Leave a variable empty ("") to skip that check until you configure it.

# Fast check that runs after every file edit (keep it under ~30s):
# Guarded: self-activates once the scaffold lands package.json at root.
TYPECHECK_CMD="test ! -f package.json || pnpm typecheck"

# Full test suite that must pass before Claude is allowed to stop:
TEST_CMD="test ! -f package.json || pnpm test"

# Branch names Claude must never push to directly:
PROTECTED_BRANCHES="main master production"

# Max times the Stop gate may push back per session (loop safety valve):
STOP_MAX_ATTEMPTS=3
