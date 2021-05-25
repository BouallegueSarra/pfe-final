import { Component, OnInit } from '@angular/core';
import { Certificat } from '../models/certificat';
import { Etudiant } from '../models/etudiant';
import { EtudiantService } from '../services/etudiant.service';
import { TestService } from '../services/test.service';
import {MatDialog} from '@angular/material/dialog';
import { ReadOneCertificatComponent } from '../read-one-certificat/read-one-certificat.component';

@Component({
  selector: 'app-read-all-certificat',
  templateUrl: './read-all-certificat.component.html',
  styleUrls: ['./read-all-certificat.component.css']
})
export class ReadAllCertificatComponent implements OnInit {

  inforUsers: any; 
  listCertif: any; 

  constructor(private testService:TestService, private EtudiantService: EtudiantService, public dialog: MatDialog) { }

  ngOnInit(): void {
    var currentUser = JSON.parse(localStorage.getItem('token')); 
    let token = currentUser.token;
    let id =currentUser.id;
    this.EtudiantService.getbyid(id).subscribe(
    (res)=> { this.inforUsers=res;
              this.testService.afficheToutCertif(id).subscribe(
                  (res)=>{this.listCertif=res;},
                  (err)=>{console.log(err);})
  },
    (err)=>{console.log(err);}
  );
}

openDialog(niveau :any) {

  this.dialog.open(ReadOneCertificatComponent , { data: {niv: niveau},width: '810px' });
}
}