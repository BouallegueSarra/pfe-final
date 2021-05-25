import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Professeur } from 'src/app/models/professeur'; 
import { EtudiantService } from 'src/app/services/etudiant.service';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../models/contact';
import { ContactService } from 'src/app/services/contact.service';
import { DatePipe } from '@angular/common'
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [DatePipe]
})
export class ContactComponent implements OnInit {
  contact :  FormGroup; 
  inforUsers:any;
  myDate = new Date();
  // myyDate = this.datePipe.transform(myDate, 'yyyyMMddHHmmss');

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,private datePipe: DatePipe,private conctactService: ContactService,private EtudiantService:EtudiantService, private fb: FormBuilder, private router: Router,private route: ActivatedRoute) {
    

    

      let  FormControls ={
        email : new FormControl('', [
           Validators.required, 
           Validators.pattern('^[a-zA-Z]+$'),
           Validators.minLength(2)
        ]),
        sujet : new FormControl('', [
            Validators.required, 
            Validators.minLength(2)
       ]),
       message : new FormControl('', [
         Validators.required, 
         Validators.email,
        ])
      }
    


    this.contact=this.fb.group(FormControls);
  }


  get email (){ return this.contact.get('email'); }
  get sujet (){ return this.contact.get('sujet'); }
  get message (){ return this.contact.get('message'); }
  
  id =this.route.snapshot.paramMap.get('id');
  
  
  ngOnInit(): void {

    console.log(this.data);


  }

  contacter(){
   
    var currentUser = JSON.parse(localStorage.getItem('token')); 
       let token = currentUser.token;
       let id =currentUser.id;

       this.EtudiantService.getbyid(id).subscribe(
        (res)=> { this.inforUsers=res;
          let data= this.contact.value;
          
          
          let cont =new Contact(this.data.adresse,data.sujet, data.message, this.inforUsers.email, this.myDate);  
          this.conctactService.addContact(cont).subscribe(
            (res)=>{console.log("ajout avec succes");},
            (err)=>{console.log(err);
            }
          )
        },
        (err)=>{console.log(err);})
  }

}
