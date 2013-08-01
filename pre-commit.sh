#!/bin/bash

dir=`dirname $0`
ver=`$dir/../../git-revision.sh -c -p`

git stash -q --keep-index

# for a pre-commit hook, use --cached instead of HEAD^ HEAD
IFS=$'\n'
git diff --name-only --cached | grep '\.js$' |
while read file; do
  if [ -f "$file" ]; then
    echo versioning $file
    # exit immediately if the script fails
    echo -e '/^\/\/[ \t]*@version\ns/version\([ \t]*\).*/version\1'$ver'\nw\nq\n' | ed $file
  fi
done

git stash pop -q
