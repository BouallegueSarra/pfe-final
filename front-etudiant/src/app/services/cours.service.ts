import { Injectable } from '@angular/core';
import{ HttpClient} from '@angular/common/http'; 
import { Cours } from '../models/cours';
import { Etudiant } from '../models/etudiant';
import { Professeur } from '../models/professeur';
import { Admin } from '../models/admin'; 
import { Section } from '../models/section';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  private url ='http://localhost:3000/';
  constructor( private http: HttpClient) { }


// **gestion de cours**
addCours (cours :any){
  return this.http.post(this.url+'addCours',cours);     
   }

   afficheCoursbyidProf(id:any){
    return this.http.get(this.url+'getCours/'+id);     
  }

afficheinfoCour(id:any){
  
  return this.http.get(this.url+'getOneCours/'+id);   
}

  updateCours( cours: Cours,id:any){
    return this.http.put(this.url+'updateContenuCours/'+id,cours);
  }

  archiverCours(id: any, etat:any){
    return this.http.put(this.url+'archiverCours/'+id, etat);
  }


// **gestion des Paragraphe**

addParagraphe (paragraphe :any){
  return this.http.post(this.url+'addParagraphe',paragraphe);     
   }

   afficheParagraphebyidCours(id:any){
    return this.http.get(this.url+'getParagraphe/'+id);     
  }
  afficheinfoParagraphe(id:any){
  
    return this.http.get(this.url+'getOneParagraphe/'+id);   
  }

  updateParagraphe( paragraphe: Section,id:any){
    return this.http.put(this.url+'updateParagraphe/'+id,paragraphe);
  }

  consultCoursEtudiant(id:any){
    return this.http.get(this.url+'consultCours/'+id);     
  }
  uploadImgParag(id: any,titre: any,file:any){
    return this.http.post(this.url+'uploadImgParag/'+id+'/'+titre, file);
  }
  uploadVideoSection(id: any,titre: any,file:any){
    return this.http.post(this.url+'uploadVideoSection/'+id+'/'+titre, file);
  }




}
