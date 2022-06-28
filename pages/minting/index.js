import React from "react";
import NavBar from "../../src/navbar";

export default function mintingPage() {
    const [likes, setLikes] = React.useState(0);
    function handleClick(){
        setLikes(likes+1);
    }
    return(
        <div><NavBar/><button onClick={handleClick}>minting({likes})</button></div>
    );
}