import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { Etudiant } from 'src/app/models/etudiant';

import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-etudiant',
  templateUrl: './update-etudiant.component.html',
  styleUrls: ['./update-etudiant.component.css']
})
export class UpdateEtudiantComponent implements OnInit {
  modifierEtudiantForm : FormGroup; 
  infoEtudiant: any;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private EtudiantService:EtudiantService,private fb: FormBuilder, private router: Router,private route: ActivatedRoute) {
    let  FormControls ={

      nom : new FormControl('', [
         Validators.required, 
         Validators.pattern('^[a-zA-Z]+$'),
         Validators.minLength(2)]), 

       prenom : new FormControl('', [
         Validators.required, 
         Validators.pattern('^[a-zA-Z]+$'),
         Validators.minLength(2)]),

         email : new FormControl('', [
         Validators.required, 
         Validators.email
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

       date_naissance : new FormControl('', [
         Validators.required
         ]), 
         
     genre : new FormControl('', [ Validators.required])
   }
   this.modifierEtudiantForm=this.fb.group(FormControls);

 }
 get nom (){ return this.modifierEtudiantForm.get('nom'); }
 get prenom (){ return this.modifierEtudiantForm.get('prenom'); }
 get email (){ return this.modifierEtudiantForm.get('email'); }
 get mot_passe (){ return this.modifierEtudiantForm.get('mot_passe');}
 get telephone (){ return this.modifierEtudiantForm.get('telephone'); }
 get date_naissance (){ return this.modifierEtudiantForm.get('date_naissance'); }
 get genre (){ return this.modifierEtudiantForm.get('genre'); }

 id =this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    this.EtudiantService.getbyid(this.data.id).subscribe(
      (res)=>{
        let data=res ;         
        this.modifierEtudiantForm.patchValue({
           nom: data['nom'], 
           prenom : data['prenom'], 
           email : data['email'], 
           telephone : data['telephone'], 
           date_naissance : data['date_naissance'], 
           genre : data['genre']})
      },
     (err)=>{console.log(err); }
    ); 
}



  updateEtudiant(){
    let data= this.modifierEtudiantForm.value;
    this.EtudiantService.getbyid(this.data.id).subscribe(
      (res)=>{this.infoEtudiant=res; 
    let etudiant=new Etudiant(data.nom, data.prenom, data.email, data.mot_passe,'etudiant',data.telephone, data.date_naissance, data.genre,null, true, this.infoEtudiant.photo) ;
        
    this.EtudiantService.updateEtudiant(etudiant,this.data.id).subscribe(
      (res)=>{this.router.navigate(['/readAllEtudiant']); },
      (err)=>{console.log(err); }
    ); 
  }, 
  (err)=>{console.log(err);}
    );
}
}