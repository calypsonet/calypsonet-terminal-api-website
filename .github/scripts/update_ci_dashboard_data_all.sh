#!/bin/sh

echo "Update the projects dashboard content..."

repository_owner=$1
repository_name="calypsonet-terminal-api-website"
token=$2

echo "Check if the dashboard needs to be updated..."
./.github/scripts/update_ci_dashboard_data_check_all_repos_status.sh $token
if [ $? -eq 1 ]; then
  echo "No update is needed"
  exit 1
else
  echo "The dashboard needs to be updated because at least one repository has been updated"
fi

echo "Clone $repository_name..."
git clone https://github.com/$repository_owner/$repository_name.git

if [ $? -ne 0 ]; then
  echo "Error while cloning repository "$repository_name
  exit 1
fi

cd $repository_name

echo "Checkout gh-pages branch..."
git checkout -f gh-pages

if [ $? -ne 0 ]; then
  echo "Error while checkouting branch gh-pages"
  exit 1
fi

echo "Delete existing dashboard data directory..."
rm -rf dashboard/

echo "Create dashboard data directory..."
mkdir dashboard/

echo "{ \"datetime\":\"`date --utc --iso-8601=seconds`\"}" > dashboard/datetime.json

echo "[" >> dashboard/repository_list.json
../.github/scripts/update_ci_dashboard_data_repository.sh $token calypsonet-terminal-card-uml-api main true false
echo "," >> dashboard/repository_list.json
../.github/scripts/update_ci_dashboard_data_repository.sh $token calypsonet-terminal-reader-uml-api main true false
echo "," >> dashboard/repository_list.json
../.github/scripts/update_ci_dashboard_data_repository.sh $token calypsonet-terminal-calypso-uml-api main true false
echo "," >> dashboard/repository_list.json
../.github/scripts/update_ci_dashboard_data_repository.sh $token calypsonet-terminal-calypso-crypto-legacysam-uml-api main true false
echo "," >> dashboard/repository_list.json
../.github/scripts/update_ci_dashboard_data_repository.sh $token calypsonet-terminal-card-java-api main true true
echo "," >> dashboard/repository_list.json
../.github/scripts/update_ci_dashboard_data_repository.sh $token calypsonet-terminal-reader-java-api main true true
echo "," >> dashboard/repository_list.json
../.github/scripts/update_ci_dashboard_data_repository.sh $token calypsonet-terminal-calypso-java-api main true true
echo "," >> dashboard/repository_list.json
../.github/scripts/update_ci_dashboard_data_repository.sh $token calypsonet-terminal-calypso-crypto-legacysam-java-api main true true
echo "," >> dashboard/repository_list.json
../.github/scripts/update_ci_dashboard_data_repository.sh $token calypsonet-terminal-card-cpp-api main true false
echo "," >> dashboard/repository_list.json
../.github/scripts/update_ci_dashboard_data_repository.sh $token calypsonet-terminal-reader-cpp-api main true false
echo "," >> dashboard/repository_list.json
../.github/scripts/update_ci_dashboard_data_repository.sh $token calypsonet-terminal-calypso-cpp-api main true false
echo "," >> dashboard/repository_list.json
../.github/scripts/update_ci_dashboard_data_repository.sh $token calypsonet-terminal-api-website main false false
echo "" >> dashboard/repository_list.json
echo "]" >> dashboard/repository_list.json

echo "Local dashboard data update finished."