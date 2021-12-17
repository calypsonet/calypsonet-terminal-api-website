---
title: Maintenance Guides
subtitle: 
summary:
type: book
toc: true
---

## Release procedure

1. Create a branch dedicated to the current release.
2. Check `gradle.properties` file:
   - Check the consistency of the version.
3. Check `build.gradle.kts` file:
   - Use only released dependencies.
   - Upgrade Keyple dependencies to their latest released versions.
4. Update `CHANGELOG.md` file:
   - Verify the consistency of the `Unreleased` section.
   - Move content of `Unreleased` section to a new "release" section.
   - Update bottom links.
5. Build and test the component.
6. Commit the modified files using if possible the commit message `Release x.y.z`.
7. Push and create a pull request to merge the branch into `main`.
8. Await the success of the build by the CI.
9. Squash and merge the pull request.
10. Await the success of the build by the CI.
11. Create a release on GitHub:
    - Set tag `x.y.z`
    - Set release name `x.y.z`
    - Set the content by copying/pasting the content of the current release description in the `CHANGELOG.md` file without the bottom links.
12. Await the success of the build by the CI.
13. Connect to [Nexus Repository Manager](https://s01.oss.sonatype.org/#welcome) of Calypsonet and go to "Staging Repositories" page:
    - Select the correct folder to Close & Release. It must contain the manifests, the JAR and all the others elements (sources, javadoc).
    - Close the folder.
    - Release the folder.
    - The other unwanted folders could be dropped.
14. Check the availability of the release on the [Maven Repository](https://repo.maven.apache.org/maven2/org/calypsonet/). This step may take from 10 minutes to 2 hours.
15. Update this website:
    - Update version in `params.yaml` file.
    - Update others elements if needed.
    - Commit and push the modifications.