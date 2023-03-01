#!/bin/sh

token=$1

echo "Create dashboard data directory..."
mkdir dashboard/

echo "{ \"datetime\":\"`date --utc --iso-8601=seconds`\"}" > dashboard/datetime.json

echo "[" >> dashboard/repository_list.json
../.github/scripts/dashboard_update_repo.sh $token calypsonet-terminal-card-uml-api main true false
echo "," >> dashboard/repository_list.json
../.github/scripts/dashboard_update_repo.sh $token calypsonet-terminal-reader-uml-api main true false
echo "," >> dashboard/repository_list.json
../.github/scripts/dashboard_update_repo.sh $token calypsonet-terminal-calypso-uml-api main true false
echo "," >> dashboard/repository_list.json
../.github/scripts/dashboard_update_repo.sh $token calypsonet-terminal-calypso-crypto-legacysam-uml-api main true false
echo "," >> dashboard/repository_list.json
../.github/scripts/dashboard_update_repo.sh $token calypsonet-terminal-card-java-api main true true
echo "," >> dashboard/repository_list.json
../.github/scripts/dashboard_update_repo.sh $token calypsonet-terminal-reader-java-api main true true
echo "," >> dashboard/repository_list.json
../.github/scripts/dashboard_update_repo.sh $token calypsonet-terminal-calypso-java-api main true true
echo "," >> dashboard/repository_list.json
../.github/scripts/dashboard_update_repo.sh $token calypsonet-terminal-calypso-crypto-legacysam-java-api main true true
echo "," >> dashboard/repository_list.json
../.github/scripts/dashboard_update_repo.sh $token calypsonet-terminal-card-cpp-api main true false
echo "," >> dashboard/repository_list.json
../.github/scripts/dashboard_update_repo.sh $token calypsonet-terminal-reader-cpp-api main true false
echo "," >> dashboard/repository_list.json
../.github/scripts/dashboard_update_repo.sh $token calypsonet-terminal-calypso-cpp-api main true false
echo "," >> dashboard/repository_list.json
../.github/scripts/dashboard_update_repo.sh $token calypsonet-terminal-api-website main false false
echo "" >> dashboard/repository_list.json
echo "]" >> dashboard/repository_list.json