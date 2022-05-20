import React from "react";


function Responses(responses) {
    
    const responseContent = responses || []; 
   
    return (

            <div id="response-area" className="container text-center">
                <ul>This is a list
                    {responseContent[0] && responseContent.forEach(response => 
                        <li>{response}</li>
                    )}
                </ul>
                
            </div>
    )
}

export default Responses; 