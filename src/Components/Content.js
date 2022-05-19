import React, { useState, useEffect } from "react";

function Content() {

    const API_KEY = process.env.REACT_APP_MY_SECRET_API_KEY;

    function handleClick(e) {
        e.preventDefault();
        const API_KEY = process.env.REACT_APP_MY_SECRET_API_KEY;
        console.log(API_KEY);
    }

    return (
        <div class="container text-center">
            <form>
                <label class="align-self-start m-1">Enter prompt below</label><br></br>
                <textarea id="promptArea" class="align-self-center"></textarea><br></br>
                <button type="submit" class="btn btn-primary"
                    onClick={(e) => handleClick(e)}>Submit</button>
            </form>
        </div>
    )
}

export default Content; 
