#!/bin/bash

set -euo pipefail

cd "$(dirname "$0")"

readonly pass_result='✅ passed'
readonly fail_result='❌ FAILED'
fail_count=0

if npm run prettier ; then
  readonly prettier_result="$pass_result"
else
  readonly prettier_result="$fail_result"
  fail_count=$((fail_count + 1))
fi

if npm run lint ; then
  readonly lint_result="$pass_result"
else
  readonly lint_result="$fail_result"
  fail_count=$((fail_count + 1))
fi

if npm run tsc ; then
  readonly tsc_result="$pass_result"
else
  readonly tsc_result="$fail_result"
  fail_count=$((fail_count + 1))
fi

if npm run mocha ; then
  readonly mocha_result="$pass_result"
else
  readonly mocha_result="$fail_result"
  fail_count=$((fail_count + 1))
fi

echo "prettier: $prettier_result"
echo "lint: $lint_result"
echo "tsc: $tsc_result"
echo "mocha: $mocha_result"

if [[ $fail_count -gt 0 ]] ; then
  exit 1
fi
