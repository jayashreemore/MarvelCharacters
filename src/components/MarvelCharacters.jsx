import React, { useState } from 'react';
import md5 from 'md5';

const MarvelCharacters = ({ character: { id, name, thumbnail, description } }) => {
    const [isOpen, setIsOpen] = useState(false);//state to manage whether the modal is open or closed
    const [details, setDetails] = useState(null);// to store details of the character

    const fetchCharacterDetails = async () => {
        const timestamp = new Date().getTime();  // to generate timestamp
        const hash = md5(timestamp + PRIVATE_API_KEY + PUBLIC_API_KEY); //md5 library hash

        try {
            const response = await fetch(`https://gateway.marvel.com/v1/public/characters/${id}?apikey=${PUBLIC_API_KEY}&ts=${timestamp}&hash=${hash}`);
            const data = await response.json(); ///convert response to jason 
            setDetails(data.data.results[0]); //set details of the character
            setIsOpen(true);
        } catch (error) {
            console.error("Error fetching character details:", error); // log error if fetching fails
        }
    };

    return (
        <>
            <div className='character' key={id} onClick={fetchCharacterDetails}>
                <div>
                    <img src={`${thumbnail.path}/standard_fantastic.${thumbnail.extension}`} alt={name} />
                </div>
                <div>
                    <h3>{name}</h3>
                    <p>{description}</p>
                </div>
            </div>
            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setIsOpen(false)}>&times;</span>
                        <h2>{details.name}</h2>
                        <p>Description: {details.description}</p>
                        {/* Include additional details according to Marvel API response */}
                    </div>
                </div>
            )}
        </>
    );
};

export default MarvelCharacters;