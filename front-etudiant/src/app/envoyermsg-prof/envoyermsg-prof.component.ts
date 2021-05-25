import { Component, OnInit , Inject } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import {FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormArray} from '@angular/forms';
import { DatePipe } from '@angular/common'
import { Contact } from '../models/contact';
import { EtudiantService } from '../services/etudiant.service';
import { ContactComponent } from '../contact/contact.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {MatDialog, MatDialogConfig,MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-envoyermsg-prof',
  templateUrl: './envoyermsg-prof.component.html',
  styleUrls: ['./envoyermsg-prof.component.css']
})
export class EnvoyermsgProfComponent implements OnInit {
  contact :  FormGroup;
  inforUsers:any;
  myDate = new Date();
  constructor(private toastr: ToastrService,private EtudiantService:EtudiantService,@Inject(MAT_DIALOG_DATA) public data: any ,private router: Router,private fb: FormBuilder, private conctactService:ContactService) {

    let  FormControls ={
      
      sujet : new FormControl('', [
          Validators.required
     ]),
     message : new FormControl('', [
       Validators.required
      ])
    }
  


  this.contact=this.fb.group(FormControls);
   }
  get sujet (){ return this.contact.get('sujet'); }
  get message (){ return this.contact.get('message'); }

  ngOnInit(): void {}

  contacterProf(){
   
    var currentUser = JSON.parse(localStorage.getItem('token')); 
       let token = currentUser.token;
       let id =currentUser.id;
       let data= this.contact.value;

       this.EtudiantService.getbyid(id).subscribe(
        (res)=> { this.inforUsers=res;
          let data= this.contact.value;
          let cont =new Contact(this.data.email,data.sujet, data.message, this.inforUsers.email, this.myDate);        
                
          this.conctactService.addContact(cont).subscribe(
            (res)=>{
            this.toastr.success('Le message a été envoyé avec succes');
            this.router.navigate(['/listCollegue']);},
            (err)=>{console.log(err);
            }
          )
        },
        (err)=>{console.log(err);})
  }


}
