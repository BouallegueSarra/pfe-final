const mongoose = require('mongoose'); 

const Reclamation = mongoose.model('Reclamation', {
    email: String,
    sujet: String, 
    reclamation: String,
    date:Date

}); 




module.exports={Reclamation}; 