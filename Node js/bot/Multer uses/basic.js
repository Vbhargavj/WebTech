const express = require("express");
const upload=require('./usMulter');
const app = express();


app.post('/upload',upload.upload('file'),(req,res)=>{
    
});
