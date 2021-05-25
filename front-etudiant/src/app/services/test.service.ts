import { Injectable } from '@angular/core';
import{ HttpClient} from '@angular/common/http'; 
import { Etudiant } from '../models/etudiant';
import { Professeur } from '../models/professeur';
import { Admin } from '../models/admin'; 
import { Test } from '../models/test';
@Injectable({
  providedIn: 'root'
})
export class TestService {
  seconds: number; 
  timer; 
  qnProgress:number;

  private url ='http://localhost:3000/';
  constructor( private http: HttpClient) { }
  
  displayTimerElapsed(){
    return Math.floor(this.seconds/3600)+' : '+Math.floor(this.seconds/60)+":"+Math.floor(this.seconds % 60);
  }
  addTestNiveau(test : any){
    return this.http.post(this.url+'addTestNiveau',test);     
  }
  afficheTestNiveau(id:any){
    return this.http.get(this.url+'getTestNiveau/'+id);     
  }
  getbyid(id: any){
    return this.http.get(this.url+'getOneTest/'+id);
  }
  updateTestNiveau( test: Test,id:any){
    return this.http.put(this.url+'updateTest/'+id,test);
  }
  deleteTest(id: any){
    return this.http.delete(this.url+'deleteTest/'+id);
  }
  consultTestNiveau(){
    return this.http.get(this.url+'getAllTest');     
  }
  valide(id: any, etat:any){
    return this.http.put(this.url+'valide/'+id, etat);
  }
  passerTest(){
    return this.http.get(this.url+'passerTest');
  }
  passerTestEvaluation(id: any){
    return this.http.get(this.url+'passerTestEval/'+id);
  }
  consultQuestionInvalid(){
    return this.http.get(this.url+'getAllTestInvalid');     
  }
  consultQuestionValid(){
    return this.http.get(this.url+'getAllTestValid');     
  }
  updateNiveau(id: any, etudiant:any){
    return this.http.put(this.url+'updateNiveau/'+id, etudiant);     
  }
  consultTestEval(id:any){
    return this.http.get(this.url+'getTestEval/'+id);     
  }
  archiver(id: any, etat:any){
    return this.http.put(this.url+'archiver/'+id, etat);
  }
  
  verifParametre(id:any){
    return this.http.get(this.url+'verifParametre/'+id);     
  }

    //get note minimal de test  selon niveau  de l'etudiant
  getNoteTest(id:any){
    return this.http.get(this.url+'getNoteTest/'+id);     
  }

  addParametre(param : any){
    return this.http.post(this.url+'addParametre',param);     
  }
  
  updateParametre(id: any, param:any){
   return this.http.put(this.url+'updateParametre/'+id, param);     
  }

//*************** Certificat*****************/
  addCertificat(certif : any){
   return this.http.post(this.url+'addCertificat',certif);     
  }

  getCertificat(id:any, niveau :any){
   return this.http.get(this.url+'getAllCertif/'+id, niveau);     
  }

  afficheToutCertif(id:any){
   return this.http.get(this.url+'readAllCertif/'+id);     
  }

}
