const user = "Shreets";

const getRepo = async () => {
  const response = await fetch(`https://api.github.com/users/${user}/repos`);
  const result = await response.json();
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
};

getRepo();
