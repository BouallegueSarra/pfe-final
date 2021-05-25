import { Component, OnInit } from '@angular/core';
import { EtudiantService } from 'src/app/services/etudiant.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { AddProfComponent } from '../add-prof/add-prof.component';
import { DatePipe } from '@angular/common'
import { UpdateProfComponent } from '../update-prof/update-prof.component';

@Component({
  selector: 'app-read-all-prof',
  templateUrl: './read-all-prof.component.html',
  styleUrls: ['./read-all-prof.component.css'],
  providers: [DatePipe]
})
export class ReadAllProfComponent implements OnInit {
  listProfesseur: any;
  alert: boolean;
  msg : String ;
  popoverTitle1 = 'Confirmation de blocage';
  popoverMessage1 = 'Veuillez-vous vraiment bloquer ce professeur ?';
  confirmClicked = false;
  cancelClicked = false;
  popoverTitle2 = 'Confirmation de déblocage';
  popoverMessage2 = 'Veuillez-vous vraiment débloquer ce professeur ?';
  currentDate = new Date();

  constructor(private EtudiantService:EtudiantService, public dialog: MatDialog, private datePipe: DatePipe ){
  }


  openDialogAjout() {
    const dialogConfig =new MatDialogConfig(); 
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(AddProfComponent, {width: '810px',disableClose: true});


    dialogRef.afterClosed().subscribe((result) => {
      
     this.ngOnInit();
     if(result==true){
      var messag="Le professeur a été ajoutée avec succée";
       this.alert=true;
      this.msg=messag;}
    },
    (err)=>{{console.log(err);
      this.alert=false; 
      this.msg =err.error;         
    }}
    );
    
   
}








  ngOnInit(): void {
    this.EtudiantService.getAllProf().subscribe(
      (res)=>{this.listProfesseur=res; 
      console.log(this.listProfesseur);
       },
      (err)=>{console.log(err);
      }
    )
  }
  bloquer(id: any){
    this.EtudiantService.bloquerProf(id,false).subscribe(
      (res)=>{this.ngOnInit();
        var messag="Le professeur a été bloquée avec succée";
        this.alert=true;
        this.msg=messag;},
      (err)=>{console.log(err);
      }
    )
  }

  debloquer(id: any){
    this.EtudiantService.debloquerProf(id,true).subscribe(
      (res)=>{this.ngOnInit();
        var messag="Le professeur a été débloquée avec succée";
        this.alert=true;
        this.msg=messag;
      },
      (err)=>{console.log(err);
      }
    )
  }


  openDialogModif(idd: any){

    const dialogConfig =new MatDialogConfig(); 
  dialogConfig.disableClose =true;
  dialogConfig.autoFocus =true;
  const dialogRef = this.dialog.open(UpdateProfComponent , {data: {id: idd}, width: '810px' }, );
  dialogRef.afterClosed().subscribe((result) => {
   this.ngOnInit();
   if(result==true){
   var messag="Le professeur a été bien modifié";
      this.alert=true;
      this.msg=messag;
  }}
  ,
  (err)=>{{console.log(err);
    this.alert=false; 
    this.msg =err.error;         
  }}
  );

  }







}
