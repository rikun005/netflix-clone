const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require("crypto-js");
/* const request = require('request'); */


/* function updateClient(postData){
    var clientServerOptions = {
        uri: 'http://'+clientHost+''+clientContext,
        body: JSON.stringify(postData),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    request(clientServerOptions, function (error, response) {
        console.log(error,response.body);
        return;
    });
} */

//REGISTER
router.post('/register', async (req,res) =>{

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
    });
    try{
        const user = await newUser.save();
        res.status(201).json(user);
        
    }catch(err){
        res.status(100).json(err);
    }
});

//LOGIN
router.post('/login', async (req,res)=>{
    try{
        const user = await User.findOne({emai: req.body.email});
        !user && res.status(401).json("wrong password or username!");

        var bytes  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        var originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        /* originalPassword !== req.body.password && res.status(401).json("wrong password or username!"); */ 
        console.log(originalPassword);
        if (originalPassword !== req.body.password)
        {
            res.status(200).json(user);

        }
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;