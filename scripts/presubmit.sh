#!/bin/bash

set -euo pipefail

cd "$(dirname "$0")"

readonly pass_result='✅ passed'
readonly fail_result='❌ FAILED'
fail_count=0

readonly prettier_args=(npm run prettier)
echo "==============================================================================="
echo "${prettier_args[*]}"
if "${prettier_args[@]}" ; then
  readonly prettier_result="$pass_result"
else
  readonly prettier_result="$fail_result"
  fail_count=$((fail_count + 1))
fi

readonly lint_args=(npm run lint)
echo "==============================================================================="
echo "${lint_args[*]}"
if "${lint_args[@]}" ; then
  readonly lint_result="$pass_result"
else
  readonly lint_result="$fail_result"
  fail_count=$((fail_count + 1))
fi

readonly tsc_args=(npm run tsc)
echo "==============================================================================="
echo "${tsc_args[*]}"
if "${tsc_args[@]}" ; then
  readonly tsc_result="$pass_result"
else
  readonly tsc_result="$fail_result"
  fail_count=$((fail_count + 1))
fi

readonly mocha_args=(npm run mocha)
echo "==============================================================================="
echo "${mocha_args[*]}"
if "${mocha_args[@]}" ; then
  readonly mocha_result="$pass_result"
else
  readonly mocha_result="$fail_result"
  fail_count=$((fail_count + 1))
fi

readonly mocha_browser_build_args=(npm run mocha:browser:build)
echo "==============================================================================="
echo "${mocha_browser_build_args[*]}"
if "${mocha_browser_build_args[@]}" ; then
  readonly mocha_browser_build_result="$pass_result"
else
  readonly mocha_browser_build_result="$fail_result"
  fail_count=$((fail_count + 1))
fi

readonly mocha_browser_test_args=(npm run mocha:browser:test)
echo "==============================================================================="
echo "${mocha_browser_test_args[*]}"
if "${mocha_browser_test_args[@]}" ; then
  readonly mocha_browser_test_result="$pass_result"
else
  readonly mocha_browser_test_result="$fail_result"
  fail_count=$((fail_count + 1))
fi

echo "==============================================================================="
echo "${prettier_args[*]}: $prettier_result"
echo "${lint_args[*]}: $lint_result"
echo "${tsc_args[*]}: $tsc_result"
echo "${mocha_args[*]}: $mocha_result"
echo "${mocha_browser_build_args[*]}: $mocha_browser_build_result"
echo "${mocha_browser_test_args[*]}: $mocha_browser_test_result"

if [[ $fail_count -gt 0 ]] ; then
  exit 1
fi
