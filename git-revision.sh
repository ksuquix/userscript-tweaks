#!/bin/bash
totalrevisioncount=`git log --oneline | wc -l | awk '{print $1}'`
projectversion=`git describe --tags --long | sed -e s/-/./`
cleanversion=${projectversion%%-*}

while getopts "dthc" arg; do
      case $arg in
        h)
          echo "Usage: [-t] [-c]" 
          echo "    tagversion.revisionssincetag-hash.totalrevisions"
          echo "    -t: Include total revisions"
          echo "    -c: Clean version - no hash"
	  echo "    -d: replace dash with dot in hash on full version"
	  echo "  Initial setup (or updating major/minor):"
	  echo "     git tag -a 0.0 -m 'Version 0.0'"
	  echo "     git push --tags"
	  exit
          ;;
        t)
	  dototal=1
          ;;
        c)
	  doclean=1
          ;;
        d)
	  nodash=1
          ;;
      esac
    done

if [ ! -z "$doclean" ]; then
  out=$cleanversion
else
  out=$projectversion
fi

if [ ! -z "$dototal" ]; then
  out=$out.$totalrevisioncount
fi

if [ ! -z "$nodash" ]; then
  out=`echo $out | sed -e s/-/./g`
fi

echo $out
