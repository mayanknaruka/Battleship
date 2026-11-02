import Gameboard from "./gameBoard";

function Player(type){
    const gameboard = Gameboard()

    return{
        type,
        gameboard,
    }
}

export default Player