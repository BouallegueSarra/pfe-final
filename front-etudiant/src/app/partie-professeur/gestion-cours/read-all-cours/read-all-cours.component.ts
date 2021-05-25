import { Component, OnInit } from '@angular/core';
import { Cours } from 'src/app/models/cours';
import { CoursService } from 'src/app/services/cours.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { AddCoursComponent } from '../add-cours/add-cours.component';

@Component({
  selector: 'app-read-all-cours',
  templateUrl: './read-all-cours.component.html',
  styleUrls: ['./read-all-cours.component.css']
})
export class ReadAllCoursComponent implements OnInit {
listCours: any;
listParagraphe:any;
id:any;
alert:any;
msg:any;
popoverTitle1 = "Confirmation d'archivement ";
popoverMessage1 = 'Veuillez-vous vraiment archiver ce cours ?';
confirmClicked = false;
cancelClicked = false;
index: any;
  constructor(private coursService :CoursService,public dialog: MatDialog) { }

  ngOnInit(): void {

    var currentUser = JSON.parse(localStorage.getItem('token')); 
    let token = currentUser.token;
    this.id =currentUser.id;    
    this.coursService.afficheCoursbyidProf(this.id).subscribe(
      (res)=>{this.listCours=res;
        this.index=this.listCours.length;
      },
      (err)=>{console.log(err);}
    )
}

  archiver(id: any){

    this.coursService.archiverCours(id,false).subscribe(
      (res)=>{this.ngOnInit();
        var messag="Le cours a été bien archivée";
        this.alert=true;
        this.msg=messag;
      
      },
      (err)=>{console.log(err);
      }
    )
  }


  openDialogAjout() {
    const dialogConfig =new MatDialogConfig(); 
    dialogConfig.disableClose =true;
    dialogConfig.autoFocus =true;
    const dialogRef = this.dialog.open(AddCoursComponent, {width: '810px'});

    dialogRef.afterClosed().subscribe((result) => {
     this.ngOnInit();
     if(result==true){
      var messag="Le cours a été bien ajoutée";
            this.alert=true;
            this.msg=messag;}
    
    },
    (err)=>{{console.log(err);
          
    }}
    );
   
}
  
}
