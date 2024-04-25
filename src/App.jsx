import React, { useState, useEffect } from 'react'; ///React Hooks used for managing state and performing side effects respectively.
import md5 from 'md5'; //imports the MD5 hashing function for generating hashes.
import './App.css';
import MarvelCharacters from './components/MarvelCharacters';



const API_URL = "https://gateway.marvel.com/v1/public/characters"; ///stores the base URL for the Marvel API.
const PUBLIC_API_KEY = "8c603d5552fad3e025fa1a8fd502dccc";          ///keys required for accessing the Marvel API.
const PRIVATE_API_KEY = "7603206f402a60ea22d6cbb033b440a513c863bf";

function App() {
  const [characters, setCharacters] = useState([]); //initializes state variables using the useState hook ,characters to store fetched characters
  
  const [searchTerm, setSearchTerm] = useState(''); //searchTerm to store the user's search input

  ///function to fetch characters form the Marvel API//
  const fetchCharacters = async (nameStartsWith) => {  //parameter to filter characters by name
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
///function to handle search -fetch characters based on the search term entered by the user.
  const handleSearch = () => {
    fetchCharacters(searchTerm);
  };


  // return function -1st div -main container- 'app'.SEARCH button-clicked-triggers the handleSearch func-
  //2nd div-characters?.length -conditional rendering, container holds individual character with details of it 
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