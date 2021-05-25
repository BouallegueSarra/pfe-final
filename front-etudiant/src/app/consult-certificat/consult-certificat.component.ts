import { Component, OnInit } from '@angular/core';
import { Certificat } from '../models/certificat';
import { Etudiant } from '../models/etudiant';
import { EtudiantService } from '../services/etudiant.service';
import { TestService } from '../services/test.service';
@Component({
  selector: 'app-consult-certificat',
  templateUrl: './consult-certificat.component.html',
  styleUrls: ['./consult-certificat.component.css']
})
export class ConsultCertificatComponent implements OnInit {
  inforUsers: any;
  niv : any;
  constructor(private testService:TestService, private EtudiantService: EtudiantService) { }

  ngOnInit(): void {
    var currentUser = JSON.parse(localStorage.getItem('token')); 
    let token = currentUser.token;
    let id =currentUser.id;
    this.EtudiantService.getbyid(id).subscribe(
    (res)=> { this.inforUsers=res;
    console.log("les informations de l'etudiant connect   ", this.inforUsers);

    if( this.inforUsers.niveau  =='A2'){
      this.niv="A1";
      
    }
    if( this.inforUsers.niveau  =='B1'){
      console.log("A2");
      this.niv="A2";
      
    }
    if( this.inforUsers.niveau  =='B2'){
      console.log("B1");
      this.niv="B1";
      
    }
    if( this.inforUsers.niveau  =='C1'){
      console.log("B2");
      this.niv="B2";
      
    }
    if( this.inforUsers.niveau  =='C2'){
      console.log("C1");
      this.niv="C1";
      
    }
    },
    (err)=>{console.log(err);})


  }

}
