/* eslint-disable no-unused-expressions */

import React, {useState, useEffect} from "react";

import api from './services/api'
import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  async function handleAddRepository() {
    try {
      const { data } = await api.post('repositories', {
        title: `React-Native - ${Date.now()}`, 
        url: 'https://github.com/facebook/react-native', 
        techs: [
          'JavaScript', 
          'Java'
        ]
      });
      setRepositories([...repositories, data]);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`)
      const newRepositories = repositories.filter(repository => repository.id !== id);
      setRepositories(newRepositories);
    } catch (error) {
      console.error(error);
    }
  }

  async function getRepositories(){
    try {
      const { data } = await api.get('repositories');
      setRepositories(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getRepositories();
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
