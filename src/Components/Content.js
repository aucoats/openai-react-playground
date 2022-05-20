import React, { useState, useEffect } from "react";
import Responses from './Responses';


const { Configuration, OpenAIApi } = require("openai");

// fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
//  method: "POST",
//  headers: {
//    "Content-Type": "application/json",
//    Authorization: `Bearer ${process.env.OPENAI_SECRET}`,
//  },
//  body: JSON.stringify(data),
// });

// const data = {
//     prompt: "Write a poem about a dog wearing skis",
//     temperature: 0.5,
//     max_tokens: 64,
//     top_p: 1.0,
//     frequency_penalty: 0.0,
//     presence_penalty: 0.0,
//    };
   


function Content() {

    // Setting up API config
    const API_KEY = process.env.REACT_APP_MY_SECRET_API_KEY;
    const configuration = new Configuration({
        apiKey: API_KEY,
      });

    const openai = new OpenAIApi(configuration); 
  
    const [paramForm, setParamForm] = useState({
        prompt: "", 
        temperature: .7, 
        max_tokens: 25, 
    })
    
    const [responses, setResponses] = useState([]);
    
    function handlePromptBlur(e) {
        const { name, value } = e.target; 

        setParamForm({...paramForm, [name]: value})
    }
    
    async function handleFetch(params) {
        const data = await openai.createCompletion("text-curie-001", params);
        
        // await fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
        //     method: "POST",
        //     headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${API_KEY}`,
        //     },
        //     body: JSON.stringify(params),
        //     })

        const response = data.data.choices[0].text;
        
        // responses.push(response);
        
        setResponses([...responses, response]);

    }

    async function handleClick(e) {
        e.preventDefault();
        const params = paramForm;

        handleFetch(params);
    }

    return (
        <>
            <div className="container text-center">
                <form>
                    <label className="align-self-start m-1">Enter prompt below</label><br></br>
                    <textarea id="promptArea" name="prompt" className="align-self-center" onChange={(e) => handlePromptBlur(e)}></textarea><br></br>
                    <button type="submit" className="btn btn-primary"
                        onClick={(e) => handleClick(e)}>Submit</button>
                </form>
            </div>
            <div className="container text-left"> 
                <h1>Responses</h1>
            </div>

            <div id="response-area" className="container text-center">
                <ul>This is a list
                   {responses.map(response => {
                       return <li>{response}</li>
                   })}
                </ul>
                
            </div>
        </>
    )
}

export default Content; 
