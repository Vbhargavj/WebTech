const mongoose =require('mongoose');

const contactSchema=mongoose.Schema({
    name:{
        required:true,
        type:String,    
    },
    number:{
        required:true,
        type:String
    }
})

const Contact = mongoose.model('CONTACT',contactSchema);

module.exports=Contact;