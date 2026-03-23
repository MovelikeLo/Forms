const express = require('express')
const app = express();
const userRouter = require('./routes/users');

//const wordsRouter = require('./routes/words');
const UserRouter = require('./routes/words');
const e = require('express');
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/',(req,res)=>{
    console.log('Here');
    res.render('index',{userName:'Loic'});
}
);