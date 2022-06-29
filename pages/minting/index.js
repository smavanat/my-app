import React from "react";
import NavBar from "../../src/navbar";
import Home from "../nft/index.js";
import { useState } from "react";

export default function mintingPage() {
    const [likes, setLikes] = React.useState(0);
    function handleClick(){
        setLikes(likes+1);
    }
    return(
        <div><NavBar/><button onClick={Home}>minting</button></div>
    );
}