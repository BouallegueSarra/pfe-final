const mongoose = require('mongoose'); 
const {Section}= require('./section');

const Cours = mongoose.model('Cours', {
    titreprincipal : String,
    id_professeur: String, 
    etat :Boolean,
    niveau: String  


}); 




module.exports={Cours}; 