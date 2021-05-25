const mongoose = require('mongoose'); 

const Contact = mongoose.model('Contact', {
    email : [String],  
    sujet :String, 
    message : String, 
    email2 :String,
    date :String
}); 

module.exports={Contact}; 