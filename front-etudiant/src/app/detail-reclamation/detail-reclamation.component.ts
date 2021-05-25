import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogConfig,MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ContactService} from 'src/app/services/Contact.service';

@Component({
  selector: 'app-detail-reclamation',
  templateUrl: './detail-reclamation.component.html',
  styleUrls: ['./detail-reclamation.component.css']
})
export class DetailReclamationComponent implements OnInit {
  inforReclamation :any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,private ContactService : ContactService) { }

  ngOnInit(): void {
    console.log(this.data.id);
    this.ContactService.getReclamationbyid(this.data.id).subscribe(
       (res)=> { this.inforReclamation=res;}
    )
}

}
