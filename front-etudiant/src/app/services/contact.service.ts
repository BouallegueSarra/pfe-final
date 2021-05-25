import { Injectable } from '@angular/core';
import{ HttpClient} from '@angular/common/http'; 
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private url ='http://localhost:3000/';
  constructor( private http: HttpClient) { }



  //liste des etudiant de chaque prof
  afficheListeEtudiant (id :any){
    return this.http.get(this.url+'readEtudiant/'+id);     
  }

  //liste des collegue de chaque etudiant
  afficheListeCollegue(id :any){
    return this.http.get(this.url+'readCollegue/'+id);     
  }


  //liste des collegue de chaque etudiant
  afficheInfoProf(id :any){
    return this.http.get(this.url+'readInfoProf/'+id);     
  }

  //ajouter contact
  addContact(contact :any){
    return this.http.post(this.url+'addContact', contact);     
  }

  //liste des contact de l'utiilisateur
  afficheContact(id :any){
    return this.http.get(this.url+'getContact/'+id);     
  }

  //consultDetailContact
  afficheDetailContact(id :any){
    return this.http.get(this.url+'getOneContact/'+id);     
  }

   //consult contact envoyer
   afficheContactEnvoye(id :any){
    return this.http.get(this.url+'getContactEnvoye/'+id);     
  }

  //ajouter reponse
  ajouterReponse(reponse :any){
    return this.http.post(this.url+'addReponse', reponse);     
  }

  //affichage de réponse de chaque contact
  afficheReponse(id :any){
    return this.http.get(this.url+'getReponse/'+id );     
  }


  getbyEmail(email :any){
    return this.http.get(this.url+'getEmail/'+ email );   
 
      
  }


  getAllReclamation(){
    return this.http.get(this.url+'getAllReclamation');     
  }

  getReclamationbyid(id :any){
    return this.http.get(this.url+'getReclamation/'+ id );    
  }

  addReclamation(reclam :any){
    return this.http.post(this.url+'addReclamation', reclam);     
  }



}
