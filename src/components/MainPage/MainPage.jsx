import React, { useEffect, useState } from 'react';
import './MainPageStyles.css';
import axios from 'axios';

const MainPage = () => {

    const [responseData, setResponseData] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    
    const subscriptionKey = '8998b0505cd34a2fae3ec294c289381c';
    const endpoint = 'https://itsteppv1211.cognitiveservices.azure.com/computervision/imageanalysis:analyze?features=caption,read&model-version=latest&language=en&api-version=2023-10-01';

    const headers = {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-Type': 'application/json',
    };

    const data = {
        url: imageUrl,
    };

    const handleInputChange = (e) => {
        setImageUrl(e.target.value);
    };

    useEffect(() => {
        requestByUrl();
    }, [imageUrl]);

    const requestByUrl = () => {
        if (imageUrl) {
            axios.post(endpoint, data, { headers })
                .then(response => {
                    setResponseData(response.data);    
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    return (
        <div className='mainPage'>
            <div className='neural-left'>
                <h1>NEURAL NETWORK</h1>
            </div>
            
            <div className='mainField'>
                <input
                    placeholder="Enter image URL..."
                    type="text"
                    name="imageUrl"
                    className="input"
                    value={imageUrl}
                    onChange={handleInputChange}
                />
                <div>
                    {responseData && responseData.captionResult && (
                        <div>
                            <img src={imageUrl} alt="" />
                            <h2>Description of image: {responseData.captionResult.text}</h2>
                        </div>
                    )}
                </div>
            </div>

            <div className='neural-right'>
                <h1>NEURAL NETWORK</h1>
            </div>
        </div>
    );
}

export default MainPage;
