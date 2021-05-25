import { Injectable } from '@angular/core';
import{ HttpClient} from '@angular/common/http'; 
import { Etudiant } from '../models/etudiant';
import { Professeur } from '../models/professeur';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})

export class EtudiantService {
  private url ='http://localhost:3000/';
  constructor( private http: HttpClient) { }

  addEtudiant(etudiant : any){
    return this.http.post(this.url+'addEtudiant',etudiant);     
     }
     
  login(etudiant){
    return this.http.post(this.url+'login',etudiant);     
     }

  isLoggedIn(){
  let token =localStorage.getItem('token'); 
     if (token){
        return true;
      } else {
        return  false; 
      }
  }


  
  //********gestion de etudiant admin*************** */ 

  getAllEtudiant(){
    return this.http.get(this.url+'getAllEtudiant');     
  }

  getbyid(id: any){
    return this.http.get(this.url+'getOne/'+id);
  }

  updateEtudiant( etudiant: Etudiant,id:any){
    return this.http.put(this.url+'updateEtudiant/'+id,etudiant);
  }
  bloquerEtudiant(id: any, etat:any){
    return this.http.put(this.url+'bloqueEtudiant/'+id, etat);
  }
  debloquerEtudiant(id: any, etat:any){
    return this.http.put(this.url+'debloqueEtudiant/'+id, etat);
  }
  getAllProf(){
    return this.http.get(this.url+'getAllProfesseur');     
  }
  addProfesseur(professeur: any){
    return this.http.post(this.url+'addProfesseur', professeur);     
  }

  bloquerProf(id: any, etat:any){
    return this.http.put(this.url+'bloqueProf/'+id, etat);
  }
  debloquerProf(id: any, etat:any){
    return this.http.put(this.url+'debloqueProf/'+id, etat);
  }
  updateProfesseur( prof: Professeur,id:any){
    return this.http.put(this.url+'updateProfesseur/'+id,prof);
  }  
  //********gestion profil admin*************** */ 

  getbyidAdmin(id: any){
    return this.http.get(this.url+'getOneAdmin/'+id);
  }
  uploadImage(id: any,file:any){
    return this.http.post(this.url+'upload/'+id, file);
  }
  updateAdministrateur( admin: Admin,id:any){
  return this.http.put(this.url+'updateAdmin/'+id,admin);
  } 





}
