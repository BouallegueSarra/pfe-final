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

@Component({
  selector: 'app-detail-contact-envoye',
  templateUrl: './detail-contact-envoye.component.html',
  styleUrls: ['./detail-contact-envoye.component.css'],
  providers: [DatePipe]
})
export class DetailContactEnvoyeComponent implements OnInit {
  infoContact:any;
  infoReponse:any; 
  user:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private EtudiantService:EtudiantService,private fb: FormBuilder,private conctactService: ContactService ,private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.data);
    var currentUser = JSON.parse(localStorage.getItem('token')); 
    let token = currentUser.token;
    let id =currentUser.id;

    this.EtudiantService.getbyid(id).subscribe(
      (res)=>{this.user=res;},
      (err)=>{console.log(err);}
    )

    this.conctactService.afficheDetailContact(this.data.id).subscribe(
      (res)=>{this.infoContact=res;
      console.log(this.infoContact);
      },
      (err)=>{console.log(err);}
    )
    this.conctactService.afficheReponse(this.data.id).subscribe(
      (res)=>{this.infoReponse=res; },
      (err)=>{console.log(err);}
    )

  }

}
