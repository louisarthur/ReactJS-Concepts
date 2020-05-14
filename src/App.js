import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
      console.log(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: "Umbriel",
      url: "https://github.com/Rocketseat/umbriel",
      techs: ["Node", "Express", "TypeScript"],
    });
    // Interessante a resposta do dado postado, pois aqui ele utiliza como novo repositories
    // console.log(response.status);
    // console.log(response.statusText);
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    const newRepositories = repositories.filter((repo) => {
      return repo.id !== id;
    });
    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => {
          return (
            <li key={repo.id}>
              {repo.title}
              <button
                type="button"
                onClick={() => handleRemoveRepository(repo.id)}
              >
                {" "}
                Remover{" "}
              </button>
            </li>
          );
        })}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
