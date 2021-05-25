const mongoose = require('mongoose'); 
const {User}= require('./user');


const Etudiant= User.discriminator('Etudiant', {

    telephone : Number,
    date_naissance : String, 
    genre: String,  
    niveau : String,
    etat:Boolean, 
    photo:String
 
}); 

// photo:{ type: String, default: './avatar.pn' },


module.exports={Etudiant}; 