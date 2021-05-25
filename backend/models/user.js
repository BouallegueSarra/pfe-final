

const mongoose = require('mongoose'); 


const User = mongoose.model('User', {
    nom : String, 
    prenom : String, 
    email: String, 
    mot_passe : String, 
    role :String   

}); 




module.exports={User}; 