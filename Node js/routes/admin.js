const expres = require("express");
const path=require('path')
const route = expres.Router();

route.get('/add-product',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','add-product.html'))
    // res.send('<form action="/admin/add-product" method="post"><input type="text" name="title"></input><button type="submit">Add product</button></form>')
})

route.post('/add-product',(req,res,next)=>{
    console.log(req.body)
    res.redirect('/')
})

module.exports=route