---
title: How to contribute
linktitle: Contributing
summary: Find out how to contribute to the Calypso Networks Terminal API project and how it can benefit your organization.
type: book
toc: true
weight: 1
---

---
## Definition of Calypso layer APIs

The [**C**alypso **N**etworks **A**ssociation](https://calypsonet.org/about-calypso-networks-association-cna/)  is responsible for specifying, qualifying and promoting the Calypso ticketing standard. **Contributions to the definition of Calypso APIs for ticketing terminals are therefore reserved for CNA members** participating in the [“TC Terminal” technical working group](https://calypsonet.org/working-groups/).
- Registered members have access to a [document database and a discussion forum](https://calypsonet.sharepoint.com/sites/TCterminal/SitePages/Home.aspx) to exchange ideas, propose and agree on solutions for the design of interoperable Calypso ticketing terminals.
- These collaborations have, for example, led to the [specification of requirements for the Calypso layer of ticketing terminals](https://calypsonet.org/document/calypso-layer-requirements-v2-0-200423/). Compliance with these requirements by ticketing terminal solutions ensures interoperability with all Calypso card and SAM products.

Calypso APIs for ticketing terminals:
- enable the implementation of libraries that meet the requirements of the Calypso layer,
- provide a solution for developing ticketing applications for terminals independently of Calypso middleware solutions,
- will soon enable Calypso terminal solutions to certify compliance with Calypso layer requirements.

[Join CNA](https://calypsonet.org/cna-community-overview/) to contribute to defining [Calypso APIs for ticketing terminals](https://terminal-api.calypsonet.org/specifications/calypso-layer/).

## Definition of Reader layer APIs

An interoperable Calypso software layer can only be built on a generic reader software layer interface, independent of card reader solutions and ticketing terminal architecture (embedded/distributed). CNA is not necessarily legitimate in defining such “universal” terminal interfaces for the smart card industry but has initiated these definitions in response to the need for a basis on which to build Calypso APIs.

For the [definition of the reader APIs for ticketing terminals](https://terminal-api.calypsonet.org/specifications/reader-layer/), CNA is **interested in the participation of any external contributor** and is also open to sharing the governance of this project with other entities or the open-source community. (CNA offered the [**S**mart **T**icketing **A**lliance](https://www.smart-ticketing.org/) to host this project.
Another option currently under consideration is to transfer this responsibility to the [Eclipse Keypop open-source project](https://keypop.org/).)

### Types of contributions

Thanks for your interest in participating in the reader layer APIs definition for a ticketing terminal.
There are several ways to contribute to the project:
- **Propose a fix** for a problem that is already known or that you have identified. In this case you will have to notify the issue in the repository where the problem appeared and reference the issue in all the other repositories affected by the fix.
- **Propose the creation of a new component**: in this case you will first have to create an issue in the repository [github.com/calypsonet/calypsonet-terminal-api-website](https://github.com/calypsonet/calypsonet-terminal-api-website/issues) to justify the need and request the creation of a new repository, wait for the issue to be resolved by the decision of the committers, and then create an issue in the new repository signifying the start of development of the new component.

### Contributing via fork

1. Check if there is already a GitHub issue for what you want to work on or create one.
2. Announce in the comments section that you want to work on the issue. Also describe the solution you want to implement. 
To improve the chances for your contribution to be accepted, you'll want to wait for the feedback of the committers.
3. Fork the repository.
4. Create a new branch from `main` for your changes. Name it after the issue number, e.g. `#XXX_[description_of_changes]`.
5. Implement your changes.
6. Rebase on `main`.
7. Run `./gradlew spotlessApply` to format the code and add licence headers to the files.
8. Run `./gradlew build` (to check code formatting and run tests)
9. Commit your changes using the `-s` flag in order to add a **Signed-off-by** footer as mentioned above and use the same email address you are using for your GitHub account.<br>
   Use commits messages that respect the [commits message conventions](#commits-message-conventions).
10. Push your changes to your forked repository.
11. Submit a [pull request](https://help.github.com/articles/using-pull-requests/) referencing the related issue(s).
12. After submitting, do not use your branch for any other development, otherwise further changes that you make will be visible in the PR.

### Commits message conventions

In order to ensure good readability of the commit history, it is necessary to have consistency in the structure of the commit messages.

Therefore, all contributors to the project are asked to respect the structure of the commits messages as described in the guide [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/):

```
<type>[optional scope]: <description>

[optional body]

<footer(s)>
```
Furthermore, it is requested to indicate in the `footer` section the associated issue(s) that will be closed (`Closes #xxx, closes #yyy, etc...`).
This will automatically close the associated issue(s) when the pull request is validated (see [GitHub Docs](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) for more details).

It is also required to indicate possible references to other associated issues (`Refs: #aaa, #bbbb, repository_owner/other_repository_name#ccc, etc...`).

Here is fictive example:

```ini
feat(observation): allow asynchronous notification of reader events

Add a public method in the observable reader to enable asynchronous notifications.

Closes #34, closes #38
Refs: #12, calypsonet/calypsonet-terminal-reader-uml-api#54
```
