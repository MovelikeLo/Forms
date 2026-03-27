const express = require('express');
const router = express.Router();



router.get('/',(req,res)=>{
    res.send('User List');
}).post('/',(req,res)=>{
   const firstName = req.body.firstName;
   const lastName = req.body.lastName;
   const age = req.body.age;
   const gender = req.body.gender;

   const isValid = firstName !=="" && lastName !=="" && age !=="" && gender !=="";
    if(isValid){
        console.log(`Adding user: ${firstName} ${lastName}, ${age}, ${gender}`);
        users.push({firstName, lastName, age, gender});
        res.render('users/list',{users});
    }
    else{
        console.log('Error');
        res.render('users/new',{firstName, lastName, age, gender});
    }
});
router.get('/list',(req,res)=>{
    res.render('users/list',{users});
});
router.get('/new',(req,res)=>{
    res.render('users/new');
});
router.route('/:id').get((req, res)=>{
    console.log(req.user);
    console.log('Getting User data for id');
    
    
res.send(`Getting User data for id: ${req.params.id}`);
}).delete((req, res)=>{
res.send(`Deleting User data for id: ${req.params.id}`);
}).put((req, res)=>{
res.send(`Updating User data for id: ${req.params.id}`);
});

const users =[{firstName:"George", lastName:"Washington", age:25, gender:"Male"}, {firstName:"Justyna", lastName:"Kean", age:30, gender:"Female"}];

router.param('id',(req,res,next,id)=>{
    req.user = users[id];
    next();
});
module.exports = router;