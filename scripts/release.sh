#!/bin/bash

set -e

#if [[ ! "$TRAVIS_BRANCH" =~ ^release/.*$ ]]; then
#    echo "Skipping release because this is not a 'release/*' branch"
#    exit 0
#fi

# Travis executes this script from the repository root, so at the same level than package.json
VERSION=$(node -p -e "require('./package.json').version")

# Make sure that the associated tag doesn't already exist
GITTAG=$(git ls-remote origin refs/tags/v$VERSION)
if [ "$GITTAG" != "" ]; then
    echo "Tag for package.json version already exists, aborting release"
    exit 1
fi

#git remote add auth-origin https://github.com/idoshr/chartjs-chart-treemap.git
git config --global user.email "idoshraga@gmail.com"
git config --global user.name "idoshr"
git checkout --detach --quiet
git add -f dist/*.js bower.json
git commit -m "Release $VERSION"
git tag -a "v$VERSION" -m "Version $VERSION"
git push -q auth-origin refs/tags/v$VERSION 2>/dev/null
git remote rm auth-origin
git checkout -f @{-1}
