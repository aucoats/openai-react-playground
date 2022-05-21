import React, { useState, useEffect } from "react";
// import Responses from "./Responses";

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
  
    // data to be sent to api 
    const [paramForm, setParamForm] = useState({
        prompt: "", 
        temperature: .7, 
        max_tokens: 25, 
    })
    
    // responses and response manipulation for dom update
    const [responses, setResponses] = useState([]);

    // for useEffect hook rerendering
    const [count, setCount] = useState(0);

    // gets responses from localStorage and rerenders
    useEffect(() => {
        console.log('getting responses from localStorage');
        const stored = localStorage.getItem("responses"); 
        if (!stored) {
            setResponses([]);
        } else {
            setResponses(JSON.parse(stored));
        }
        
    }, [count])
    

    function handlePromptBlur(e) {
        let { name, value } = e.target; 

        if (name === 'temperature') {
            value = parseInt(value);
        }
       
        setParamForm({...paramForm, [name]: value})

        console.log(paramForm);
    }
    
    async function handleFetch(params) {
        const data = await openai.createCompletion("text-curie-001", params);

        const input = JSON.parse(data.config.data).prompt;
        const response = data.data.choices[0].text;

        const keyPair = { input , response }; 
        
        responses.push(keyPair);
        
        setResponses(responses);
        localStorage.setItem("responses", JSON.stringify(responses));

        // resets form
        setParamForm({
            prompt: "", 
            temperature: .7, 
            max_tokens: 25,
        })

    
    }

    async function handleClick(e) {
        e.preventDefault();
        const params = paramForm;
        handleFetch(params);
        setCount(count+1);
    }

    return (
        <>
            <div className="container text-center">
                <div className="row">
                    <div className="col container text-left m-2 p-2">
                            <p>This is a testing ground for the <a href="https://beta.openai.com/docs/" target={"_blank"} rel={"noopener"}>OpenAI API</a> (specifically the <a href="https://beta.openai.com/docs/guides/completion" target={"_blank"} rel={"noopener"}>Completion API</a>). Enter a prompt to have the API complete your sentence. You can give it instructions, have it come up with lists, or have it respond to you conversationally. </p>
                    </div>
                    <form className="col" onSubmit={(e) => handleClick(e)}>
                        <div className="input-group">
                            <label className="input-group-text">Response randomness factor?</label>
                            <input type={"number"} min={0} max={.9} step={.1} name="temperature" className="form-control align-self-center" onChange={(e) => handlePromptBlur(e)} value={paramForm.temperature}></input>
                        </div>
                        <div className="input-group">
                            <label className="input-group-text">Your prompt: </label><br></br>
                            <textarea type="text" id="promptArea" name="prompt" className="form-control align-self-center" onChange={(e) => handlePromptBlur(e)} value={paramForm.prompt}></textarea><br></br>
                            <button type="submit" className="btn btn-primary"
                                onClick={(e) => handleClick(e)}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>

                <h1 className="mt-3 text-center">Responses</h1>

            <div id="response-area" className="container text-center">
            <ul className="list-group">
                {responses.map(response => {
                    return <>
                                <li key={response.response} className="list-group-item">
                                <span>Prompt: {response.input}</span><br></br>
                                <span>Response: {response.response}</span></li>
                            </>
                })}
            </ul>
        </div>
        </>
    )
}

export default Content; 
