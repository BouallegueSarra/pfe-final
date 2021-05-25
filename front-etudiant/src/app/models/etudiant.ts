export class Etudiant {


constructor(
    private nom: String, 
    private prenom: String,
    private email:String,  
    private mot_passe:String,
    private role :String,

    private telephone:number, 
    private date_naissance ?: String, 
    private genre ?:String,
    private niveau ?:String,
    private etat ?:boolean,
    private photo ?:String) {};




}


