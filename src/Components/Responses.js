import React from "react";


function Responses(responses) {

    const responseContent = responses || []; 

    return (

        <div id="response-area" className="container text-center">
            <ul>
                {responseContent.map(response => {
                    return <>
                                <li key={response.response}>
                                <span>Prompt: {response.input}</span>
                                <span>Response: {response.response}</span></li>
                            </>
                })}
            </ul>
        </div>
    )
}

export default Responses; 