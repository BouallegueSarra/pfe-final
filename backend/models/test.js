const mongoose = require('mongoose'); 

const Test = mongoose.model('Test', {
    question : String, 
    reponse : [String], 
    correct: String, 
    etat : Boolean,
    type : String, 
    id_professeur :String, 
    niveau : String, 
    bareme :Number

}); 




module.exports={Test}; 