# Fatal Startup Verification Checklist (Authoritative)

EAS development builds DO NOT load static JS bundles.
Static-bundle explanations are forbidden.

## Step 1 — Boot Beacon
- Did any JS log appear?
  - YES → JS executed
  - NO → Native bootstrap failure

## Step 2 — Crash Phase (choose ONE)
- Native bootstrap failure
- JavaScript import-time failure
- Runtime exception after JS start

## Step 3 — Evidence Requirement
SAFE verdict requires:
- File path
- Line number or stack trace
- Concrete error message

If missing → verdict MUST be UNKNOWN.

## Step 4 — Forbidden Explanations
- Missing static bundles
- Empty static-build folders
- Metro fallback theories

## Step 5 — Native Bootstrap Handling
- Identify native plugin
- Rebuild dev client with cleared cache
- Do NOT suggest JS fixes

## Step 6 — JS Import-Time Handling
- Identify FIRST imported module
- Fix earliest failure only

## Step 7 — Verdict Rules
Allowed verdicts:
- BLOCKING
- UNKNOWN – requires instrumentation
- SAFE (only with proof)

## Step 8 — Required Output Format
Fatal Errors:
Evidence:
Crash Phase:
Root Cause:
Verdict:
Next Action:
