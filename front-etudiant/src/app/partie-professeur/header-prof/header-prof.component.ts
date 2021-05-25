import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-header-prof',
  templateUrl: './header-prof.component.html',
  styleUrls: ['./header-prof.component.css']
})
export class HeaderProfComponent implements OnInit {

  constructor(private testService :TestService,private router: Router, private EtudiantService:EtudiantService) { }
  inforUsers: any; 
  currentUser: any; 
  id: any; 
  parametre:any; 
  nb:any;

  ngOnInit(): void {

    this.currentUser = JSON.parse(localStorage.getItem('token')); 
    this.id =this.currentUser.id;
    
    this.EtudiantService.getbyid(this.id).subscribe(
      (res)=> { this.inforUsers=res},
      (err)=>{console.log();}
    )

    this.testService.verifParametre(this.id).subscribe(
      (res)=>{this.parametre=res; 
      
      this.nb=this.parametre.length;
      console.log("dmdmdmdd   ", this.nb);
      
      
      }, 
      (err)=>{console.log(err);
      }
    );

  }

  logout(){
    localStorage.removeItem('token'); 
    this.router.navigate(['/login']);
  }
}
