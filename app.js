const user = "Shreets";
var multiPageData = [];

const getRepo = async () => {
  var response = await fetch(
    `https://api.github.com/users/${user}/repos?per_page=100&type=owner&page=1`
  );
  var link = response.headers.get("link");
  var result = await response.json();
  if (link) {
    var x = link
      .replace("&page=", " ")
      .replace("&page=", " ")
      .replace(">;", "")
      .replace(">;", "")
      .split(" ");
    var last = parseInt(x[x.length - 2]);
    for (let i = 1; i <= last; i++) {
      response = await fetch(
        `https://api.github.com/users/${user}/repos?per_page=100&type=owner&page=${i}`
      );
      result = await response.json();
      multiPageData.push(result);
      console.log(multiPageData);
    }
    var multipageArray = multiPageData.flat(Infinity);

    multipageArray.map((i) => {
      console.log(i.name);
      var project_card = document.createElement("project-card");
      project_card.className = "project-card";
      project_card.innerHTML = `
            <div>
              <h2><a href=${i.html_url} target="_blank">${i.name}</a></h2>
              <p>${i.description}</p>
              <div class="basic-info">
                <p>Stars : ${i.stargazers_count}</p>
                <p>Tech Used : ${i.language}</p>
                <p>Created On : ${i.created_at} </p>
              </div>
            </div>
          `;
      document.querySelector(".project-wrapper").appendChild(project_card);
    });
  } else {
    result.map((i) => {
      console.log(i.name);
      var project_card = document.createElement("project-card");
      project_card.className = "project-card";
      project_card.innerHTML = `
            <div>
              <h2><a href=${i.html_url} target="_blank">${i.name}</a></h2>
              <p>${i.description}</p>
              <div class="basic-info">
                <p>Stars : ${i.stargazers_count}</p>
                <p>Tech Used : ${i.language}</p>
                <p>Created On : ${i.created_at} </p>
              </div>
            </div>
          `;
      document.querySelector(".project-wrapper").appendChild(project_card);
    });
  }
};

getRepo();
