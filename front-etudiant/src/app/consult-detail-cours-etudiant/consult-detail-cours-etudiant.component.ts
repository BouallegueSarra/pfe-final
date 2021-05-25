import { Component, OnInit } from '@angular/core';
import { Cours } from 'src/app/models/cours';
import { CoursService } from 'src/app/services/cours.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-consult-detail-cours-etudiant',
  templateUrl: './consult-detail-cours-etudiant.component.html',
  styleUrls: ['./consult-detail-cours-etudiant.component.css']
})
export class ConsultDetailCoursEtudiantComponent implements OnInit {
  cours: any;
  listParagraphe:any;
  etat:any;
  constructor(private coursService :CoursService ,private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {

    let id =this.route.snapshot.paramMap.get('id');
    this.coursService.afficheinfoCour(id).subscribe(
      (res)=>{this.cours=res;},
      (err)=>{console.log(err);}
    )

    this.coursService.afficheParagraphebyidCours(id).subscribe(
      (res)=>{this.listParagraphe=res;},
      (err)=>{console.log(err);}
    )

  }

}
