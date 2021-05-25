const mongoose = require('mongoose'); 

const ParametreTest = mongoose.model('ParametreTest', {
    note : Number,  
    id_professeur :String, 
    time:Number,
    niveau : String
}); 

module.exports={ParametreTest}; 