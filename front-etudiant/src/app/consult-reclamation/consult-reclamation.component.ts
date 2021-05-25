import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ContactService} from 'src/app/services/Contact.service';
import { DetailReclamationComponent } from '../detail-reclamation/detail-reclamation.component';

@Component({
  selector: 'app-consult-reclamation',
  templateUrl: './consult-reclamation.component.html',
  styleUrls: ['./consult-reclamation.component.css']
})
export class ConsultReclamationComponent implements OnInit {

  constructor(public dialog: MatDialog,private ContactService : ContactService) { }
 
listReclamation: any;
idd:any;

  ngOnInit(): void {   
     this.ContactService.getAllReclamation().subscribe(
    (res)=>{this.listReclamation=res;  
    console.log(this.listReclamation);},
    (err)=>{console.log(err);
    }
  )
  }

  openDialog(idd :any) {
    this.dialog.open(DetailReclamationComponent , {data: {id: idd}    });  
  }





}
