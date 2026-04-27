const express = require('express');
const router = express.Router();
const {readFile} = require('fs').promises;



router.get('/',async(req,res)=>{
    let chosenWords = await getWords();
    console.log('Chosen Words:', chosenWords);
    res.render('quiz',{chosenWords});
});
router.post('/',async (req,res)=>{
    let chosenWords = await getWords();
    console.log(req.body);
    let {userChoice, correctDefinition, totalQuestions, totalCorrect} = req.body;
    let score = totalCorrect;
    let wasCorrect = false;
    if(userChoice === correctDefinition){
        console.log('Correct!');
         score++;
         wasCorrect = true;
    }
    let total = parseInt(totalQuestions) + 1;
    //let total = totalQuestions;
    console.log('Chosen Words:', chosenWords);
    res.render('quiz',{chosenWords, score, total, wasCorrect,correctDefinition});
    //res.redirect('/quiz');

});
let getWords = async () => {
    console.log('Getting Random Part');
    let randomPart = getRandomPart();
    console.log('Random Part:', randomPart);
    let allWords = await readFile('resources/allwords.txt','utf-8');
    let wordArray = allWords.split('\n');
    // console.log(wordArray)
    shuffleArray(wordArray);

    let choices = [];
    while(choices.length < 5){
        // console.log("Word Array:", wordArray);
        let line = wordArray.pop();
        // console.log('Line:', line);
        let [word,part, def] = line.split('\t');
        console.log('Part:', part); 
        if(part === randomPart){
            console.log("Parts match, adding to list of choices");
            choices.push(line);
        
        }
        else{
            console.log("Parts do not match, skipping");
        }
    }
    return choices;
};
let getRandomPart = () => {
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