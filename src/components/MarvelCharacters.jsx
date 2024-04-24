import React, { useState } from 'react';
import md5 from 'md5';

const MarvelCharacters = ({ character: { id, name, thumbnail, description } }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [details, setDetails] = useState(null);

    const fetchCharacterDetails = async () => {
        const timestamp = new Date().getTime();
        const hash = md5(timestamp + PRIVATE_API_KEY + PUBLIC_API_KEY);

        try {
            const response = await fetch(`https://gateway.marvel.com/v1/public/characters/${id}?apikey=${PUBLIC_API_KEY}&ts=${timestamp}&hash=${hash}`);
            const data = await response.json();
            setDetails(data.data.results[0]);
            setIsOpen(true);
        } catch (error) {
            console.error("Error fetching character details:", error);
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