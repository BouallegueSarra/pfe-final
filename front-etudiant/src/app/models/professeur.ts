export class Professeur {

    // ? ma3neha raw attribut howa optionnelle f creation mte3 objet
    
    constructor(
        private nom: String, 
        private prenom: String,
        private email:String,  
        private mot_passe:String,
        private role :String,
    
        private telephone:number,         
        private niveau ?:number,
        private date_embauche?: Date ,
        private genre?: String ,

        private etat ?:boolean,
        private photo ?:String) {};
    
        
    }
    
    