import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import {MatDialog} from '@angular/material/dialog';
import { DetailContactComponent } from 'src/app/detail-contact/detail-contact.component';
import { DetailContactEnvoyeComponent } from 'src/app/detail-contact-envoye/detail-contact-envoye.component';
@Component({
  selector: 'app-consult-contact-prof',
  templateUrl: './consult-contact-prof.component.html',
  styleUrls: ['./consult-contact-prof.component.css']
})
export class ConsultContactProfComponent implements OnInit {

  constructor( public dialog: MatDialog, private conctactService: ContactService) { }
  inforUsers:any; 
  contactEnv :any;
  ngOnInit(): void {

    var currentUser = JSON.parse(localStorage.getItem('token')); 
    let token = currentUser.token;
    let id =currentUser.id;

    this.conctactService.afficheContact(id).subscribe(
      (res)=>{this.inforUsers=res},
      (err)=>{console.log(err);
      }
    )

    this.conctactService.afficheContactEnvoye(id).subscribe(
        (res)=>{this.contactEnv=res;},
        (err)=>{console.log(err);}
    )
  }

  openDialog(idd :any, email2:any) {
    this.dialog.open(DetailContactComponent , {data: {id: idd, email:email2}
    });  
  }
  openDialogEnvoye(idd :any) {
    this.dialog.open(DetailContactEnvoyeComponent , {data: {id: idd}
    });
  }

}
