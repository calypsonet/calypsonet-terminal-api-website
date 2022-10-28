#!/bin/sh

# This script checks if the target repository has been updated since the last check.
# returns 0 if true, 1 if false.

token=$1
repository_name=$2

filter_website_repository=""

if [ "$repository_name" = "calypsonet-terminal-api-website" ]; then
  filter_website_repository=" -e \"pushed_at\""
fi

echo "Checking repository "$repository_name"..."

# Compare hash value of the API result by excluding these fields:
# - "size": Unknown reason of size changing.
# - "pushed_at": Cyclic commit when gh-pages branch is update (calypsonet-terminal-api-website).

github_hash=`curl --request GET \
          --url https://api.github.com/repos/calypsonet/$repository_name \
          --header "authorization: Bearer $token" \
          --header "content-type: application/json" | grep -v -e "size"$filter_website_repository | md5sum | cut -d ' ' -f 1`

dashboard_hash=`curl --request GET \
          --url https://terminal-api.calypsonet.org/dashboard/$repository_name"_.json" \
          --header "content-type: application/json" | grep -v -e "size"$filter_website_repository | md5sum | cut -d ' ' -f 1`

echo "github_hash="$github_hash
echo "dashboard_hash="$dashboard_hash

if [ "$github_hash" = "$dashboard_hash" ]; then
  echo "No update required"
  exit 1
else
  echo "Update required"
  exit 0
fi