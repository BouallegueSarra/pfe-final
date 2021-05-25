import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Professeur } from 'src/app/models/professeur'; 
import { EtudiantService } from 'src/app/services/etudiant.service';
import { ActivatedRoute } from '@angular/router';

import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-prof',
  templateUrl: './update-prof.component.html',
  styleUrls: ['./update-prof.component.css']
})
export class UpdateProfComponent implements OnInit {
  modifierProf :  FormGroup; 
  alert: boolean;
  infoProf: any;
  msg : String ;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private EtudiantService:EtudiantService, private fb: FormBuilder, private router: Router,private route: ActivatedRoute) { 

    let  FormControls ={
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
   niveau : new FormControl('', [
     Validators.required, 
 ]),genre : new FormControl('', [
   Validators.required, 
]),
 telephone : new FormControl('', [
   Validators.required, 
   Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
   Validators.minLength(8),
   Validators.maxLength(13)
   ]),
      
   }

   this.modifierProf=this.fb.group(FormControls);
  }

  get nom (){ return this.modifierProf.get('nom'); }
  get prenom (){ return this.modifierProf.get('prenom'); }
  get email (){ return this.modifierProf.get('email'); }
  get mot_passe (){ return this.modifierProf.get('mot_passe'); }
  get genre (){ return this.modifierProf.get('genre'); }
  get niveau (){ return this.modifierProf.get('niveau'); }
  get telephone (){ return this.modifierProf.get('telephone'); }
  id =this.route.snapshot.paramMap.get('id');





  ngOnInit(): void {

    this.EtudiantService.getbyid(this.data.id).subscribe(
      (res)=>{
        let data=res ;         
        this.modifierProf.patchValue({
           nom: data['nom'], 
           prenom : data['prenom'], 
           email : data['email'], 
           telephone : data['telephone'], 
           niveau : data['niveau'], 
           genre : data['genre']})
      },  
     (err)=>{console.log(err); }
    ); 
  }
  

  updateProfesseur(){
    let data= this.modifierProf.value; 
    this.EtudiantService.getbyid(this.data.id).subscribe(
      (res)=>{this.infoProf=res; 
    let prof=new Professeur(data.nom, data.prenom, data.email, data.mot_passe,'professeur',data.telephone, data.niveau,data.date_naissance, data.genre, true, this.infoProf.photo) ;
    this.EtudiantService.updateProfesseur(prof,this.data.id).subscribe(
      (res)=>{
        var messag="Le professeur a été bien modifier";
        this.alert=true;
        this.msg=messag;
      this.router.navigate(['/readAllProfesseur']);},
        (err)=>{console.log(err); }
        ); 
      }, 
      (err)=>{console.log(err);})
    }

}
