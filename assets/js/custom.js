// Copy to clipboard
function updateClipboard(newClip, button) {
    navigator.permissions.query({name: "clipboard-write"}).then(result => {
        if (result.state == "granted" || result.state == "prompt") {
            /* write to the clipboard now */
            navigator.clipboard.writeText(newClip).then(function() {
                /* clipboard successfully set */
                button.innerHTML = "Copied";
                setTimeout(function() {
                    button.innerHTML = "Copy";
                }, 2000);
            }, function() {
                /* clipboard write failed */
                alert("Error during the copy to clipboard process!");
            });
        } else {
            alert("Unable to copy to clipboard because your browser does not have the permissions to use the \"clipboard-write\" API!");
        }
    });
}
function copyTabContentToClipboard(tabpaneId, button) {
    let tabId = $("#"+tabpaneId+" a.active")[0].getAttribute("aria-controls");
    let content = $("#"+tabId+" code")[0].innerText;
    updateClipboard(content, button);
}
function copyCodeContentToClipboard(codeId, button) {
    let content = $("#code-"+codeId)[0].innerText;
    updateClipboard(content, button);
}

// Dynamic dependencies for "client application" profile of "configuration wizard" java page
const appDependencies = new Set();
function computeAppContent(language) {
    let tagPrefix = 'code#all-'+language+'-dependencies span#';
    let contentHtml = $(tagPrefix+'calypsonet-terminal-reader-java-api-dynamic').html();
    if (appDependencies.has("cardCalypso")) {
        contentHtml += "\n" + $(tagPrefix+'calypsonet-terminal-calypso-java-api-dynamic').html();
    }
    contentHtml += "\n" + $(tagPrefix+'keyple-common-java-api-dynamic').html()
        + "\n" + $(tagPrefix+'keyple-util-java-lib-dynamic').html()
        + "\n" + $(tagPrefix+'keyple-service-java-lib').html();
    if (appDependencies.has("serviceResource")) {
        contentHtml += "\n" + $(tagPrefix+'keyple-service-resource-java-lib').html();
    }
    if (appDependencies.has("distributedLocal") || appDependencies.has("distributedRemote")) {
        contentHtml += "\n" + $(tagPrefix+'keyple-distributed-network-java-lib').html();
    }
    if (appDependencies.has("distributedLocal")) {
        contentHtml += "\n" + $(tagPrefix+'keyple-distributed-local-java-lib').html();
    }
    if (appDependencies.has("distributedRemote")) {
        contentHtml += "\n" + $(tagPrefix+'keyple-distributed-remote-java-lib').html();
    }
    if (appDependencies.has("cardGeneric")) {
        contentHtml += "\n" + $(tagPrefix+'keyple-card-generic-java-lib').html();
    }
    if (appDependencies.has("cardCalypso")) {
        contentHtml += "\n" + $(tagPrefix+'keyple-card-calypso-java-lib').html();
    }
    if (appDependencies.has("pluginAndroidNfc")) {
        contentHtml += "\n" + $(tagPrefix+'keyple-plugin-android-nfc-java-lib').html();
    }
    if (appDependencies.has("pluginAndroidOmapi")) {
        contentHtml += "\n" + $(tagPrefix+'keyple-plugin-android-omapi-java-lib').html();
    }
    if (appDependencies.has("pluginPcsc")) {
        contentHtml += "\n" + $(tagPrefix+'keyple-plugin-pcsc-java-lib').html();
    }
    if (appDependencies.has("pluginStub")) {
        contentHtml += "\n" + $(tagPrefix+'keyple-plugin-stub-java-lib').html();
    }
    return contentHtml;
}
function updateAppDependencies(tabRef, checkbox) {
    if (checkbox != null) {
        if (checkbox.checked == true) {
            appDependencies.add(checkbox.id);
        } else {
            appDependencies.delete(checkbox.id);
        }
    }
    let tabContentId = "#tabs-"+tabRef+"-content";
    $(tabContentId+" .language-gradle")[0].innerHTML = computeAppContent("groovy");
    $(tabContentId+" .language-kotlin")[0].innerHTML = computeAppContent("kotlin");
    $(tabContentId+" .language-xml")[0].innerHTML = computeAppContent("maven");
}

// Dynamic dependencies for "custom Keyple card extension" profile of "configuration wizard" java page
const cardDependencies = new Set();
function computeCardContent(language) {
    let tagPrefix = 'code#all-'+language+'-dependencies span#';
    let contentHtml = $(tagPrefix+'calypsonet-terminal-reader-java-api').html()
        + "\n" + $(tagPrefix+'calypsonet-terminal-card-java-api').html()
        + "\n" + $(tagPrefix+'keyple-common-java-api').html()
        + "\n" + $(tagPrefix+'keyple-util-java-lib').html();
    if (cardDependencies.has("cardServiceResource")) {
        contentHtml += "\n" + $(tagPrefix+'keyple-service-resource-java-lib').html();
    }
    return contentHtml;
}
function updateCardDependencies(tabRef, checkbox) {
    if (checkbox != null) {
        if (checkbox.checked == true) {
            cardDependencies.add(checkbox.id);
        } else {
            cardDependencies.delete(checkbox.id);
        }
    }
    let tabContentId = "#tabs-"+tabRef+"-content";
    $(tabContentId+" .language-gradle")[0].innerHTML = computeCardContent("groovy");
    $(tabContentId+" .language-kotlin")[0].innerHTML = computeCardContent("kotlin");
    $(tabContentId+" .language-xml")[0].innerHTML = computeCardContent("maven");
}

// Data table of dependency check tool
function initDatatableDependencyCheck() {
    $('#datatable-dependency-check').DataTable( {
        ordering: false,
        paging: false,
        initComplete: function () {
            // Remove the search input text & the footer information showing the number of results
            $("#datatable-dependency-check_wrapper div.row:nth-child(3)").remove();
            $("#datatable-dependency-check_wrapper div.row:nth-child(1)").remove();
            // Add the select button to the header of each column
            this.api().columns().every( function () {
                var column = this;
                var select = $('<select><option value=""></option></select>')
                    .appendTo( $(column.header()) )
                    .on( 'change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );
                        column
                            .search( val ? '^'+val+'$' : '', true, false )
                            .draw();
                    } );
                column.data().unique().sort().reverse().each( function ( d, j ) {
                    select.append( '<option value="'+d+'">'+d+'</option>' )
                } );
            } );
        }
    } );
}

// Load the projects dashboard table content
async function loadProjectsDashboard() {

    let rootUrl = window.location.href + "../";

    if (rootUrl.includes("localhost")) {
        rootUrl = "https://calypsonet.github.io/calypsonet-terminal-api-website/";
    }

    async function getJson(fileName) {
        let response = await fetch(rootUrl + 'dashboard/' + fileName + '.json?date='+Date.now());
        return await response.json();
    }

    async function getJsonRepositoryData(repository_name, resource) {
        let response = await fetch(rootUrl + 'dashboard/' + repository_name + resource + '.json?date='+Date.now());
        return await response.json();
    }

    async function getReposData(rowIndex, owner, project) {

        // create row
        let newRow = body.insertRow();
        newRow.id = rowIndex;

        const json = await getJsonRepositoryData(project[0], "_");

        // new row
        const row = document.getElementById(rowIndex);

        // column repos name
        let cell = row.insertCell(-1);
        let a = document.createElement('a');
        let linkText = document.createTextNode(json.name);
        a.appendChild(linkText);
        a.title = json.name;
        a.href = json.html_url;
        a.target = "_blank";
        cell.appendChild(a);

        // column doc
        cell = row.insertCell(-1);
        if (project[1] === true) {
            let space = document.createTextNode("  ");
            cell.appendChild(space);
            a = document.createElement('a');
            linkText = document.createTextNode("🕮");
            cell.appendChild(space);
            a.appendChild(linkText);
            a.title = "API documentation for " + json.name;
            a.href = "https://calypsonet.github.io/" + json.name;
            a.target = "_blank";
            cell.appendChild(a);
        }

        // column repos status
        cell = row.insertCell(-1);
        cell.setAttribute("id", "repos-status-" + rowIndex);

        // column latest release
        cell = row.insertCell(-1);
        cell.setAttribute("id", "latest-release-" + rowIndex);
        cell.appendChild(document.createTextNode(""));

        // column latest tag
        cell = row.insertCell(-1);
        cell.setAttribute("id", "latest-tag-" + rowIndex);
        cell.appendChild(document.createTextNode(""));

        // column updated
        cell = row.insertCell(-1);
        cell.appendChild(document.createTextNode(formatDate(json.pushed_at)));

        // column issues
        cell = row.insertCell(-1);
        cell.setAttribute("id", "issue-" + rowIndex);
        cell.appendChild(document.createTextNode(""));

        // column branches
        cell = row.insertCell(-1);
        cell.setAttribute("id", "branch-" + rowIndex);
        cell.appendChild(document.createTextNode(""));

        // column pull requests
        cell = row.insertCell(-1);
        cell.setAttribute("id", "pull-" + rowIndex);
        cell.appendChild(document.createTextNode(""));

        // column forks
        cell = row.insertCell(-1);
        cell.appendChild(document.createTextNode(json.forks.toString()));

        // column stars
        cell = row.insertCell(-1);
        cell.appendChild(document.createTextNode(json.stargazers_count.toString()));

        // column created
        cell = row.insertCell(-1);
        cell.appendChild(document.createTextNode(formatDate(json.created_at)));

        // get complementary data
        await getBranches(rowIndex, owner, project[0]);
        await getPullData(rowIndex, owner, project[0]);
        await getLatestRelease(rowIndex, owner, project[0]);
        await getLatestTag(rowIndex, owner, project[0]);
        if (project[2] === true) {
            await getStatus(rowIndex, owner, project[0]);
        }

        // debug
        console.log(json.data);
    }

    async function getBranches(rowIndex, owner, repos) {
        const json = await getJsonRepositoryData(repos, "_branches");
        let cell = document.getElementById("branch-" + rowIndex);
        cell.innerHTML = '' + json.length;
        if (json.length > 2) {
            cell.style.backgroundColor = "#FFE0F0";
        }
    }

    async function getPullData(rowIndex, owner, repos) {
        const json = await getJsonRepositoryData(repos, "_pulls");
        let cell = document.getElementById("pull-" + rowIndex);
        if (json.length > 0) {
            cell.style.backgroundColor = "orange";
        }
        cell.innerHTML = json.length;
        cell = document.getElementById("issue-" + rowIndex);
        if (json.length > 0) {
            cell.style.backgroundColor = "orange";
        }
        cell.innerHTML = json.length;
    }

    async function getLatestRelease(rowIndex, owner, repos) {
        let cell = document.getElementById("latest-release-" + rowIndex);
        try {
            const json = await getJsonRepositoryData(repos, "_releases_latest");
            if (json.tag_name !== undefined) {
                cell.innerHTML = json.tag_name;
            }
        } catch (err) {
        }
    }

    async function getLatestTag(rowIndex, owner, repos) {
        let cell = document.getElementById("latest-tag-" + rowIndex);
        try {
            const json = await getJsonRepositoryData(repos, "_tags");
            cell.innerHTML = json[0].name;
        } catch (err) {
        }
    }

    async function getStatus(rowIndex, owner, repos) {

        let cell = document.getElementById("repos-status-" + rowIndex);
        let json;

        try {
            json = await getJsonRepositoryData(repos, "_check_runs");
        } catch (err) {
        }

        const a = document.createElement('a');
        const linkText = document.createTextNode("\u2b24");
        a.appendChild(linkText);
        a.title = "CI status page";
        a.href = "https://github.com/" + owner + "/" + repos + "/actions";
        a.target = "_blank";

        if(json.check_runs[0] != null && json.check_runs[0].status === "completed") {
            switch (json.check_runs[0].conclusion) {
                case "failure":
                case "action_required":
                case "cancelled":
                case "skipped":
                case "timed-out":
                    a.style.color = "red";
                    break;
                case "neutral":
                    a.style.color = "lightgreen";
                    break;
                case "success":
                    a.style.color = "green";
                    break;
            }
        } else {
            a.style.color = "orange";
        }
        cell.appendChild(a);
    }

    function formatDate(dateString) {
        let d = new Date(dateString),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            hour = '' + d.getHours(),
            min = '' + d.getMinutes(),
            sec = '' + d.getSeconds();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        const date = [year, month, day].join('/');

        if (hour.length < 2)
            hour = '0' + hour;
        if (min.length < 2)
            min = '0' + min;
        if (sec.length < 2)
            sec = '0' + sec;

        const time = [hour, min, sec].join(':');

        return date + ' ' + time;
    }

    let owner = "calypsonet";

    let lastUpdate = await getJson('datetime');
    let dateOptions = {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit', timeZoneName:'short'};
    $("#projects-dashboard-datetime")[0].innerHTML = new Date(lastUpdate.datetime).toLocaleDateString('en-EN', dateOptions);

    let projects = await getJson('repository_list');

    // create promises
    const body = document.getElementById("projects-dashboard-content");
    let promises = [];
    for (let i = 0; i < projects.length; i++) {
        let promise = getReposData((i + 1).toString(), owner, projects[i])
        promises.push(promise);
    }

    await (async () => {
        await Promise.all(promises)
            .finally(function () {
                $('#projects-dashboard-table').DataTable({
                    "lengthMenu": [25, 50, 75, 100],
                    "order": [[5, 'desc']],
                    "oLanguage": {"sSearch": "Filter:"}
                });
                $('.dataTables_length').addClass('bs-select');
                // update the container's width with the real table size
                $('.universal-wrapper').width($('#projects-dashboard-table')[0].scrollWidth);
            });
    })();
}