const expres=require('express')
const path=require('path')
const route=expres.Router()

route.get('/',(req,res,next)=>{
    res.render('shop')
    // res.sendFile(path.join(__dirname,'../','views','shop.html'))
    // res.send('<h1>this is bhargav"s server</h1>')
})

module.exports=route  