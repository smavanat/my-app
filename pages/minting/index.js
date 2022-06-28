function mintingPage() {
    const [likes, setLikes] = React.useState(0);
    function handleClick(){
        setLikes(likes+1);
    }
    return(
        <div><button onClick={handleClick}>minting({likes})</button></div>
    );
}