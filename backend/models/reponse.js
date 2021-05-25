const mongoose = require('mongoose'); 

const Reponse = mongoose.model('Reponse', {
    id_contact:String, 
    email : [String],   
    message : String, 
    email2 :String,
    date :String
}); 

module.exports={Reponse}; 