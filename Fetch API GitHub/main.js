let theInput = document.querySelector(".repos-container input");
let reposBtn = document.querySelector(".repos-container .get-button");
let reposData = document.querySelector(".repos-container .show-data");


reposBtn.onclick = function() {
    getRepos();
}


function getRepos() {

    if(theInput.value == "") {
        reposData.innerHTML = "<span>Please Write a Username</span>";
    }
    else {
        fetch(`https://api.github.com/users/${theInput.value}/repos`)

        .then((response) => response.json())

        .then((repositories) => {

            reposData.innerHTML = "";

            repositories.forEach(repos => {

                //create main div for the repos
                let mainDiv = document.createElement("div");

                //adding the repos name in the main div
                let reposName = document.createTextNode(repos.name);

                mainDiv.appendChild(reposName);

                //creating the link of the repos
                let theUrl = document.createElement("a");

                let theUrlName = document.createTextNode("Visit");

                theUrl.appendChild(theUrlName);

                //creating the link address for the repos
                theUrl.href = `https://github.com/${theInput.value}/${repos.name}`;

                //setting the attribute of the link
                theUrl.setAttribute("target", "_blank");

                mainDiv.appendChild(theUrl);

                //creating the stars count element
                let starsSpan = document.createElement("span");

                let starsSpanCount = document.createTextNode(`${repos.stargazers_count} Stars`);

                starsSpan.appendChild(starsSpanCount);

                mainDiv.appendChild(starsSpan);

                mainDiv.className = "repos-box";

                reposData.appendChild(mainDiv);

            })
        })
    }
}