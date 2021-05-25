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
  selector: 'app-envoyermessage',
  templateUrl: './envoyermessage.component.html',
  styleUrls: ['./envoyermessage.component.css']
})
export class EnvoyermessageComponent implements OnInit {
  contact :  FormGroup;
  inforUsers:any;
  myDate = new Date();
  constructor(private toastr: ToastrService,private EtudiantService:EtudiantService,@Inject(MAT_DIALOG_DATA) public data: any ,private fb: FormBuilder, private conctactService:ContactService) {

    let  FormControls ={
      
      sujet : new FormControl('', [
          Validators.required])
          ,
     message : new FormControl('', [
       Validators.required
      ])
}
    this.contact=this.fb.group(FormControls);
}
     
get sujet (){ return this.contact.get('sujet'); }
get message (){ return this.contact.get('message'); }

  
  ngOnInit(): void {
    console.log(this.data.tab.value);
  }

  contacter(){
    var currentUser = JSON.parse(localStorage.getItem('token')); 
      let token = currentUser.token;
      let id =currentUser.id;

     this.EtudiantService.getbyid(id).subscribe(
       (res)=> { this.inforUsers=res;
                let data= this.contact.value;

                  let tab =this.data.tab.value;
                      let cont =new Contact(tab,data.sujet, data.message, this.inforUsers.email, this.myDate);                            
                     this.conctactService.addContact(cont).subscribe(
                       (res)=>{console.log("ajout avec succes");
                       this.toastr.success('Le message a été envoyé avec succes');},
                       (err)=>{console.log(err);
                       }
                     )
           },
           (err)=>{console.log(err);}
     )
}

}
