const mongoose = require('mongoose'); 

const Section = mongoose.model('Section', {
    titre : String,
    description: String, 
    image :String,
    video :String,    
    id_cours: String

}); 




module.exports={Section}; 