import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EtudiantService } from 'src/app/services/etudiant.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  inforUsers: any; 
  currentUser: any; 
  id: any; 
  constructor(private router: Router, private EtudiantService:EtudiantService) { }

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
