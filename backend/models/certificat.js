const mongoose = require('mongoose'); 

const Certificat = mongoose.model('Certificat', {
    id_test : [String],  
    niveau :String, 
    id_etudiant : String
}); 

module.exports={Certificat}; 