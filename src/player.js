import Gameboard from "./gameboard";

function Player(type){
    const gameboard = Gameboard()

    return{
        type,
        gameboard,
    }
}

export default Player