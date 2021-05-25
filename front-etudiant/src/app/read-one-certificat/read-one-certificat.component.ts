import { EtudiantService } from '../services/etudiant.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-read-one-certificat',
  templateUrl: './read-one-certificat.component.html',
  styleUrls: ['./read-one-certificat.component.css']
})
export class ReadOneCertificatComponent implements OnInit {
  inforUsers:any; 
  constructor( private EtudiantService: EtudiantService, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
    var currentUser = JSON.parse(localStorage.getItem('token')); 
    let token = currentUser.token;
    let id =currentUser.id;
    this.EtudiantService.getbyid(id).subscribe(
    (res)=> { this.inforUsers=res;},
    (err)=>{console.log(err); }
  
    )
    

}
}