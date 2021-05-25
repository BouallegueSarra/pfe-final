const mongoose = require('mongoose'); 
const {User}= require('./user');


const Professeur= User.discriminator('Professeur', {

    telephone : Number,
    niveau : String, 
    genre: String, 
    date_embauche: Date,
    etat:Boolean, 
    photo:String
    

}); 



module.exports={Professeur}; 