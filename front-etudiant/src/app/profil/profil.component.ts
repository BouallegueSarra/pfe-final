import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { EtudiantService } from 'src/app/services/etudiant.service';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { formatDate } from "@angular/common";



import { Admin } from 'src/app/models/admin'; 
import { Professeur } from 'src/app/models/professeur'; 
import { Etudiant } from 'src/app/models/etudiant'; 

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
  providers: [DatePipe]
})
export class ProfilComponent implements OnInit {
  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;
  filetype : any; 
  modifier :  FormGroup; 
  alert: boolean;
  msg : String ;
  currentUser: any; 
  id: String; 
  inforUsers:any; 
  role: any;
  modifierForm : FormGroup; 
  info:any; 
  popoverTitle1 = 'Confirmation de modification';
  popoverMessage1 = 'Veuillez-vous vraiment modifier tes informations ?';
  confirmClicked = false;
  cancelClicked = false;
  

    constructor(private datePipe: DatePipe, private EtudiantService:EtudiantService,private fb: FormBuilder, private router: Router,private route: ActivatedRoute){let  FormControls ={
      nom : new FormControl('', [
         Validators.required, 
         Validators.pattern('^[a-zA-Z]+$'),
         Validators.minLength(2)
      ]),
      prenom : new FormControl('', [
          Validators.required, 
          Validators.minLength(2)
     ]),
     email : new FormControl('', [
       Validators.required, 
       Validators.email,
      ]),
 
      mot_passe : new FormControl('', [
       Validators.required, 
       Validators.minLength(6)
   ]),
 
   telephone : new FormControl('', [
     Validators.required, 
     Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
     Validators.minLength(8),
     Validators.maxLength(13)
     ]),
 
     niveau : new FormControl('', [
      Validators.required, 
  ]),

     date_naissance : new FormControl('', [
       Validators.required
       ]), 
       
   genre : new FormControl('', [ Validators.required])   }
 
   this.modifier=this.fb.group(FormControls);
   }
 
 
  get nom (){ return this.modifier.get('nom'); }
  get prenom (){ return this.modifier.get('prenom'); }
  get email (){ return this.modifier.get('email'); }
  get mot_passe (){ return this.modifier.get('mot_passe'); }
  get telephone (){ return this.modifier.get('telephone'); }
  get date_naissance (){ return this.modifier.get('date_naissance'); }
  get genre (){ return this.modifier.get('genre'); }  
  get niveau (){ return this.modifier.get('niveau'); }

    ngOnInit(): void {
      this.currentUser = JSON.parse(localStorage.getItem('token')); 
      this.id =this.currentUser.id; 
      this.EtudiantService.getbyid(this.id).subscribe(
        (res)=> { this.inforUsers=res
        
          this.modifier.patchValue({
            nom: this.inforUsers['nom'], 
            prenom : this.inforUsers['prenom'], 
            email : this.inforUsers['email'], 
            telephone : this.inforUsers['telephone'], 
            date_naissance : this.inforUsers['date_naissance'], 
            niveau : this.inforUsers['niveau'],
            genre : this.inforUsers['genre']
          })           
        }, 
        (err)=>{console.log(err);
        });
        
        
      
      }
    

      
 
//----------------------update admin----------------------------
 
updateAdministrateur(){
  let data= this.modifier.value; 
  let admin=new Admin(data.nom, data.prenom, data.email, data.mot_passe,'admin') ;
  this.EtudiantService.updateAdministrateur(admin,this.id).subscribe(
    (res)=>{
      this.ngOnInit();
      var messag=" Les informations ont été bien modifiée";
      this.alert=true;
      this.msg=messag;
    },
    
    
  
      (err)=>{console.log(err); }
  ); 
  }

 //----------------------update atudiant----------------------------
 
updateEtudiant(){
    const imagebd=this.fileInput.nativeElement.files[0];
    const file =new FormData(); 
    file.set('file',imagebd);    
     if(imagebd.type === 'image/png') {
       this.filetype = 'png';
     }
     if(imagebd.type === 'image/jpeg') {
        this.filetype = 'jpg';
     }    
     let myDate = new Date();
   let myyDate = this.datePipe.transform(myDate, 'yyyyMMddHHmmss');
   let photo=this.id+myyDate+'.'+this.filetype;

  let data= this.modifier.value; 

  let etudiant=new Etudiant(data.nom, data.prenom, data.email, data.mot_passe,'etudiant',data.telephone, data.date_naissance, data.genre,null, true, photo) ;
  console.log(etudiant);
  this.EtudiantService.uploadImage(this.id,file).subscribe(
               (res)=>{console.log(this.id+'.'+this.filetype);},
             (err)=>{console.log(err);}
  )

  this.EtudiantService.updateEtudiant(etudiant,this.id).subscribe(
    (res)=>{
      this.ngOnInit();
        var messag=" Les informations ont été bien modifiée";
        this.alert=true;
        this.msg=messag;
      },
      (err)=>{console.log(err); }
  ); 
  
 }
 
 
 //----------------------update prof----------------------------
 
updateProfesseur(){

  const imagebd=this.fileInput.nativeElement.files[0];
  const file =new FormData(); 
  file.set('file',imagebd);    
   if(imagebd.type === 'image/png') {
     this.filetype = 'png';
   }
   if(imagebd.type === 'image/jpeg') {
      this.filetype = 'jpg';
   }    
let myDate = new Date();
let myyDate = this.datePipe.transform(myDate, 'yyyyMMddHHmmss');
let photo=this.id+myyDate+'.'+this.filetype;

  let data= this.modifier.value;   

  let prof=new Professeur(data.nom, data.prenom, data.email, data.mot_passe,'professeur',data.telephone, data.niveau,data.date_naissance, data.genre, true, photo) ;
   
  this.EtudiantService.uploadImage(this.id,file).subscribe(
      (res)=>{},
      (err)=>{console.log(err);})

  this.EtudiantService.updateProfesseur(prof,this.id).subscribe(
    (res)=>{
      this.ngOnInit();
      var messag=" Les informations ont été bien modifiée";
      this.alert=true;
      this.msg=messag;
    },  
    
    (err)=>{console.log(err); }
  ); 
  }
        
    
}  


















