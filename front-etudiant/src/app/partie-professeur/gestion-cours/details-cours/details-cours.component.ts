import { Component, OnInit } from '@angular/core';
import { Cours } from 'src/app/models/cours';
import { CoursService } from 'src/app/services/cours.service';

import { EtudiantService } from 'src/app/services/etudiant.service';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { AddParagComponent } from '../add-parag/add-parag.component';
import { UpdateParagrapheComponent } from '../update-paragraphe/update-paragraphe.component';

@Component({
  selector: 'app-details-cours',
  templateUrl: './details-cours.component.html',
  styleUrls: ['./details-cours.component.css']
})
export class DetailsCoursComponent implements OnInit {
cours: any;
listParagraphe:any;
etat:any;
id: any; 
infoProf: any;
modifier :  FormGroup; 
popoverTitle1 = 'Confirmation de modification';
  popoverMessage1 = 'Veuillez-vous vraiment modifier tes informations ?';
  confirmClicked = false;
  cancelClicked = false;
  alert: boolean;
  msg : String ;
  constructor(public dialog: MatDialog,private EtudiantService:EtudiantService, private coursService :CoursService ,private fb: FormBuilder,private router: Router,private route: ActivatedRoute) {

    let  FormControls ={
      titreprincipal : new FormControl('', [
         Validators.required, 
         Validators.pattern('^[a-zA-Z]+$'),
         Validators.minLength(2)
      ])}

      this.modifier=this.fb.group(FormControls);
   }
   get titreprincipal (){ return this.modifier.get('titreprincipal'); }


  ngOnInit(): void {

    this.id =this.route.snapshot.paramMap.get('id');

    
    this.coursService.afficheinfoCour(this.id).subscribe(
      (res)=>{this.cours=res;},
      (err)=>{console.log(err);}
    )

    this.coursService.afficheParagraphebyidCours(this.id).subscribe(
      (res)=>{this.listParagraphe=res;},
      (err)=>{console.log(err);}
    )

  }




    openDialogAjout(idd :any) {
      const dialogConfig =new MatDialogConfig(); 
      dialogConfig.disableClose =true;
      dialogConfig.autoFocus =true;
      const dialogRef = this.dialog.open(AddParagComponent, {data: {id: idd},width: '810px'});
  
      dialogRef.afterClosed().subscribe((result) => {
       this.ngOnInit();
       if(result==true){
        var messag="La section a été bien ajoutée dans le cours";
         this.alert=true;
         this.msg=messag;
        }
      },
      (err)=>{{console.log(err);
            
      }}
      );
     
  }


  openDialogModif(idd: any){

  const dialogConfig =new MatDialogConfig(); 
  dialogConfig.disableClose =true;
  dialogConfig.autoFocus =true;
  const dialogRef = this.dialog.open(UpdateParagrapheComponent , {data: {id: idd}, width: '810px' }, );
  dialogRef.afterClosed().subscribe((result) => {
   this.ngOnInit();
   if(result==true){
    var messag="La section a été bien modifiée";
     this.alert=true;
     this.msg=messag;
    }

  },
  (err)=>{{console.log(err);
    this.alert=false; 
    this.msg =err.error;         
  }}
  );

  }


}
