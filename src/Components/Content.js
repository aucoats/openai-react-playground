import React, { useState, useEffect } from "react";

function Content() {

    return (
        <div class="container text-center">
            <form>
                <label class="align-self-start m-1">Enter prompt below</label><br></br>
                <textarea id="promptArea" class="align-self-center"></textarea><br></br>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Content; 
