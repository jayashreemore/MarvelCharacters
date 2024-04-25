import React, { useState, useEffect } from 'react';
import md5 from 'md5';
import './App.css';

const API_URL = "https://gateway.marvel.com/v1/public/characters";
const PUBLIC_API_KEY = "8c603d5552fad3e025fa1a8fd502dccc";
const PRIVATE_API_KEY = "7603206f402a60ea22d6cbb033b440a513c863bf";

function App() {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  ///function to fetch characters form the Marvel API//
  const fetchCharacters = async (nameStartsWith) => {
    const timestamp = new Date().getTime();
    const hash = md5(timestamp + PRIVATE_API_KEY + PUBLIC_API_KEY);
    try {
      const response = await fetch(`${API_URL}?apikey=${PUBLIC_API_KEY}&ts=${timestamp}&hash=${hash}&nameStartsWith=${nameStartsWith}`);
      const data = await response.json();
      setCharacters(data.data.results);
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  };

  useEffect(() => {
    ///initial fetch for characters when the component mounts

    //fetchCharacters('Spider-Man');
    fetchCharacters('Captain America');
  }, []);
///function to handle search 
  const handleSearch = () => {
    fetchCharacters(searchTerm);
  };

  return (
    <div className='app'>
      <h1>Marvel Characters</h1>
      <div className='search'>
        <input
          placeholder='Search for Characters'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>
      {characters?.length > 0 ? (
        <div className="container">
          {characters.map((character) => (
            <div className='character' key={character.id}>
              <div>
                <img src={`${character.thumbnail.path}/standard_fantastic.${character.thumbnail.extension}`} alt={character.name} />
              </div>
              <div>
                <h3>{character.name}</h3>
                <p>{character.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='empty'>
          <h2>No Characters Found</h2>
        </div>
      )}
    </div>
  );
}

export default App;