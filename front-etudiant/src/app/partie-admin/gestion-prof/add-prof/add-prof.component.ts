import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Professeur } from 'src/app/models/professeur';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-add-prof',
  templateUrl: './add-prof.component.html',
  styleUrls: ['./add-prof.component.css'],
  providers: [DatePipe]

})
export class AddProfComponent implements OnInit {

  addProf : FormGroup; 
  currentDate = new Date();
  alert: boolean;
  msg : String ;


  constructor( private EtudiantService:EtudiantService, private fb: FormBuilder, private router: Router, private datePipe: DatePipe) {
    
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

    this.addProf=this.fb.group(FormControls);
   }

  
   
   get nom (){ return this.addProf.get('nom'); }
   get prenom (){ return this.addProf.get('prenom'); }
   get email (){ return this.addProf.get('email'); }
   get mot_passe (){ return this.addProf.get('mot_passe'); }
   get genre (){ return this.addProf.get('genre'); }
   get niveau (){ return this.addProf.get('niveau'); }
   get telephone (){ return this.addProf.get('telephone'); }

  ngOnInit(): void {   
  }

  
  addProfesseur(){
  let prof =this.addProf.value; 
  let professeur = new Professeur(prof.nom,prof.prenom,prof.email,prof.mot_passe,"professeur", prof.telephone, prof.niveau,this.currentDate,prof.genre,true, 'avatar.png');
  this.EtudiantService.addProfesseur(professeur).subscribe(
    (res)=>{
      this.alert=true;
       this.router.navigate(['/readAllProfesseur']);},

    (err)=>{console.log(err); 
        this.alert=false; 
        this.msg =err.error
      }
  )
 }
}
