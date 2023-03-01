#!/bin/sh

# This script check all repositories until an update has been found.
# return 0 if at least one update was made, 1 if no.

token=$1

./.github/scripts/dashboard_check_repos_status_curl.sh $token calypsonet-terminal-card-uml-api
if [ $? -eq 0 ]; then
  exit 0
fi
./.github/scripts/dashboard_check_repos_status_curl.sh $token calypsonet-terminal-reader-uml-api
if [ $? -eq 0 ]; then
  exit 0
fi
./.github/scripts/dashboard_check_repos_status_curl.sh $token calypsonet-terminal-calypso-uml-api
if [ $? -eq 0 ]; then
  exit 0
fi
./.github/scripts/dashboard_check_repos_status_curl.sh $token calypsonet-terminal-calypso-crypto-legacysam-uml-api
if [ $? -eq 0 ]; then
  exit 0
fi
./.github/scripts/dashboard_check_repos_status_curl.sh $token calypsonet-terminal-card-java-api
if [ $? -eq 0 ]; then
  exit 0
fi
./.github/scripts/dashboard_check_repos_status_curl.sh $token calypsonet-terminal-reader-java-api
if [ $? -eq 0 ]; then
  exit 0
fi
./.github/scripts/dashboard_check_repos_status_curl.sh $token calypsonet-terminal-calypso-java-api
if [ $? -eq 0 ]; then
  exit 0
fi
./.github/scripts/dashboard_check_repos_status_curl.sh $token calypsonet-terminal-calypso-crypto-legacysam-java-api
if [ $? -eq 0 ]; then
  exit 0
fi
./.github/scripts/dashboard_check_repos_status_curl.sh $token calypsonet-terminal-card-cpp-api
if [ $? -eq 0 ]; then
  exit 0
fi
./.github/scripts/dashboard_check_repos_status_curl.sh $token calypsonet-terminal-reader-cpp-api
if [ $? -eq 0 ]; then
  exit 0
fi
./.github/scripts/dashboard_check_repos_status_curl.sh $token calypsonet-terminal-calypso-cpp-api
if [ $? -eq 0 ]; then
  exit 0
fi
./.github/scripts/dashboard_check_repos_status_curl.sh $token calypsonet-terminal-api-website
if [ $? -eq 0 ]; then
  exit 0
fi

exit 1