import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {ContactService} from 'src/app/services/Contact.service';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { Etudiant } from 'src/app/models/etudiant';
import { Professeur } from 'src/app/models/professeur';
import { Reclamation } from 'src/app/models/reclamation';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postuler-reclamation',
  templateUrl: './postuler-reclamation.component.html',
  styleUrls: ['./postuler-reclamation.component.css']
})
export class PostulerReclamationComponent implements OnInit {

  ajouterReclamation:  FormGroup; 
  inforUsers:any;
  myDate=new Date();

  constructor(private toastr: ToastrService,private router: Router,private fb: FormBuilder,private EtudiantService:EtudiantService ,private ContactService:ContactService) {
        let  FormControls ={
      sujet : new FormControl('', [
         Validators.required
      ]),
      reclamation : new FormControl('', [
          Validators.required
     ]) 
     }

     this.ajouterReclamation=this.fb.group(FormControls);
   }


    get sujet (){ return this.ajouterReclamation.get('sujet'); }
   get reclamation (){ return this.ajouterReclamation.get('reclamation'); }





   

  ngOnInit(): void {    var currentUser = JSON.parse(localStorage.getItem('token')); 
  let token = currentUser.token;
  let id =currentUser.id;
  this.EtudiantService.getbyid(id).subscribe(
    (res)=> { this.inforUsers=res;},
    (err)=>{console.log(err);
    })
    
    
  }

  addReclamation(){

    var currentUser = JSON.parse(localStorage.getItem('token')); 
       let token = currentUser.token;
       let id =currentUser.id;

       this.EtudiantService.getbyid(id).subscribe(
        (res)=> { this.inforUsers=res;
          let data= this.ajouterReclamation.value;
          
          
          let reclm =new Reclamation(this.inforUsers.email, data.sujet ,data.reclamation,  this.myDate);            
          
          this.ContactService.addReclamation(reclm).subscribe(
            (res)=>{ this.toastr.success('La réclamation a été envoyé avec succes');
            this.ngOnInit();},
            (err)=>{console.log(err);
            }
          )
        },
        (err)=>{console.log(err);})
  }

}
