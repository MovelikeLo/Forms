const express = require('express');
const router = express.Router();
const {readFile} = require('fs').promises;



router.get('/',(req,res)=>{
    res.send('Quiz List');
});

let getWords = async () => {
    let randomPart = getRandomPart();

}
let getRandomPart = async () => {
    let parts = ['noun','verb','adjective'];
    let randomIndex = Math.floor(Math.random() * parts.length);
    let randompart = parts[randomIndex];
    return randompart;
}
let shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let randomNumber = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomNumber]] = [array[randomNumber], array[i]];
    }
};


module.exports = router;