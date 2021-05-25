import { Component, OnInit } from '@angular/core';
import { CoursService } from 'src/app/services/cours.service';
import { Router } from '@angular/router';
import { EtudiantService } from '../services/etudiant.service';

@Component({
  selector: 'app-consult-cours',
  templateUrl: './consult-cours.component.html',
  styleUrls: ['./consult-cours.component.css']
})
export class ConsultCoursComponent implements OnInit {
listCours: any;
listParagraphe: any
infoUser: any

  constructor(private etudiantService :EtudiantService, private coursService :CoursService, private router: Router) { }

  ngOnInit(): void {

    var currentUser = JSON.parse(localStorage.getItem('token')); 
    let token = currentUser.token;
    let id =currentUser.id; 
this.etudiantService.getbyid(id).subscribe(
(res)=>{this.infoUser=res}, 
(err)=>{console.log(err);
}
)

    this.coursService.consultCoursEtudiant(id).subscribe(
(res)=>{this.listCours=res; },
(err)=>{console.log(err);
}
    )
  }

}
