import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { Etudiant } from '../models/etudiant';
import { EtudiantService } from '../services/etudiant.service';
import { Admin } from '../models/admin';
import {ElementRef,  ViewChild } from '@angular/core';


@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.css']
})

export class RegistreComponent implements OnInit {


  inscriptionForm : FormGroup; 
  alert: boolean;
  msg : String ;
 

  constructor( private fb: FormBuilder, private router: Router,private EtudiantService:EtudiantService ) {
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
            Validators.email,
           ]),

           mot_passe : new FormControl('', [
            Validators.required, 
            Validators.minLength(6)
        ]),
        mot_passe2 : new FormControl('', [
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
            Validators.required, 
            ]), 
            
        genre : new FormControl('', [ Validators.required]), 

      }
      this.inscriptionForm=this.fb.group(FormControls);

    }
    get nom (){ return this.inscriptionForm.get('nom'); }
    get prenom (){ return this.inscriptionForm.get('prenom'); }
    get email (){ return this.inscriptionForm.get('email'); }
    get mot_passe (){ return this.inscriptionForm.get('mot_passe');}
    get mot_passe2 (){ return this.inscriptionForm.get('mot_passe2');}
    get telephone (){ return this.inscriptionForm.get('telephone'); }
    get date_naissance (){ return this.inscriptionForm.get('date_naissance'); }
    get genre (){ return this.inscriptionForm.get('genre'); }


  ngOnInit(): void {

    let logged = this.EtudiantService.isLoggedIn(); 
    if (logged){this.router.navigate(['/profil']);}

  }

  addEtudiant(){
    let etud=this.inscriptionForm.value; 
    let etudiant=new Etudiant (etud.nom, etud.prenom, etud.email, etud.mot_passe, "etudiant", etud.telephone, etud.date_naissance, etud.genre, null, true, 'avatar.png' ); 
    console.log(etudiant);
    
    this.EtudiantService.addEtudiant(etudiant).subscribe(
      (res)=> {
        let token= JSON.stringify(res); 
        localStorage.setItem('token', token);  
        this.router.navigate(['/profil']);        
      },
      (err)=>{console.log(err);
        this.alert=false; 
        this.msg =err.error;         
      }
    )
    
    
     } 

    }
