import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EtudiantService } from 'src/app/services/etudiant.service';

@Component({
  selector: 'app-header-etudiant',
  templateUrl: './header-etudiant.component.html',
  styleUrls: ['./header-etudiant.component.css']
})
export class HeaderEtudiantComponent implements OnInit {

  constructor(private router: Router, private EtudiantService:EtudiantService) { }
  inforUsers: any; 
  currentUser: any; 
  id: any; 
  ngOnInit(): void {

    this.currentUser = JSON.parse(localStorage.getItem('token')); 
    this.id =this.currentUser.id; 
    
    this.EtudiantService.getbyid(this.id).subscribe(
      (res)=> { this.inforUsers=res},
      (err)=>{console.log();}
    )


  }
  logout(){

    localStorage.removeItem('token'); 
    this.router.navigate(['/login']);
  }

}
