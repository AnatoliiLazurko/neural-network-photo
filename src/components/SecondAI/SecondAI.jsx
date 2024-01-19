import React, { useState } from 'react';
import { TextAnalysisClient, AzureKeyCredential } from "@azure/ai-language-text";
import './SecondAIStyles.css';

const SecondAI = () => {

    const [responseData, setResponseData] = useState(null);
    const [userComment, setUserComment] = useState('');

    const handleInputChange = (e) => {
        setUserComment(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        analyzeText();
    };

    const analyzeText = async () => {
        const endpoint = 'https://pv121test02.cognitiveservices.azure.com/';
        const apiKey = '08122b18bb8b48c2a93e003c33c9a87c';

        const documents = [userComment];

        const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(apiKey));

        try {
            const result = await client.analyze(
                "SentimentAnalysis",
                documents,
                {}
            );

            console.log(result)
            setResponseData(result);
        } catch (error) {
            console.error("Error analyzing text:", error);
        }
    };

    return (
        <div className='mainPage'>
            
            <div className='mainField'>
                <form onSubmit={handleSubmit}>
                    <label>
                        Enter Comment:
                        <textarea className='input' type="text" value={userComment} onChange={handleInputChange} />
                    </label>
                    <button className='btn-analyze' type="submit">Analyze</button>
                </form>

                {responseData && responseData.length > 0 && (
                    <div className='result-section'>
                        {responseData.map((result) => (
                            <div key={result.id}>
                                <h2>Sentiment: {result.sentiment}</h2>
                                <p className='positive-txt'>Positive: {result.confidenceScores.positive}%</p>
                                <p className='neutral-txt'>Neutral: {result.confidenceScores.neutral}%</p>
                                <p className='negative-txt'>Negative: {result.confidenceScores.negative}%</p>
                            </div>
                        ))}
                    </div>
                )} 

            </div>

        </div>
    );
}

export default SecondAI;