import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormArray} from '@angular/forms';
import { EtudiantService } from '../services/etudiant.service';
import { Reponse } from '../models/reponse';
import { DatePipe } from '@angular/common'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-contact',
  templateUrl: './detail-contact.component.html',
  styleUrls: ['./detail-contact.component.css'],
  providers: [DatePipe]
})
export class DetailContactComponent implements OnInit {
  cours: any;
  infoContact:any;
  reponses :  FormGroup;
  inforUsers:any;
  myDate = new Date();
  re: any;
  infoReponse: any; 
  user:any; 
  constructor(private toastr: ToastrService,@Inject(MAT_DIALOG_DATA) public data: any,private EtudiantService:EtudiantService,private fb: FormBuilder,private conctactService: ContactService ,private router: Router,private route: ActivatedRoute) { 

    let  FormControls ={
      reponse : new FormControl('', [
        Validators.required, 
        Validators.minLength(2)
   ])
    }
    this.reponses=this.fb.group(FormControls);
  }
  get reponse (){ return this.reponses.get('reponse'); }

  ngOnInit(): void {
    this.conctactService.afficheDetailContact(this.data.id).subscribe(
      (res)=>{this.infoContact=res;
      console.log(this.infoContact);
      
      this.conctactService.getbyEmail(this.data.email).subscribe(
        (res)=>{this.user=res; },
        (err)=>{console.log(err);}
      )

      },
      (err)=>{console.log(err);}
    )
    this.conctactService.afficheReponse(this.data.id).subscribe(
      (res)=>{this.infoReponse=res;},
      (err)=>{console.log(err);}
    )

  }

  Repondre(){
    this.re=this.reponses.value;
    var currentUser = JSON.parse(localStorage.getItem('token')); 
    let token = currentUser.token;
    let id =currentUser.id;

   this.EtudiantService.getbyid(id).subscribe(
     (res)=> { this.inforUsers=res;
              let data= this.reponse.value;

              this.conctactService.afficheDetailContact(this.data.id).subscribe(
                (res)=>{this.infoContact=res;
                 let rep =new Reponse(this.data.id,this.infoContact.email2, this.re.reponse, this.inforUsers.email, this.myDate);  

               this.conctactService.ajouterReponse(rep).subscribe(
                (res)=>{console.log("ajout avec succes");
                this.toastr.success('La réponse a été envoyé avec succes');
                
                this.router.navigate(['/listContactEtudiant']);},
                (err)=>{console.log(err);}
              )},
              (err)=>{console.log(err);}
              )
},
     (err)=>{console.log(err);}
   )
  }

}
