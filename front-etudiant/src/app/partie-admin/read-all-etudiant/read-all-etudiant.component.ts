import { Component, OnInit } from '@angular/core';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { UpdateEtudiantComponent } from '../update-etudiant/update-etudiant.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';


@Component({
  selector: 'app-read-all-etudiant',
  templateUrl: './read-all-etudiant.component.html',
  styleUrls: ['./read-all-etudiant.component.css']
})
export class ReadAllEtudiantComponent implements OnInit {

  listEtudiant: any;
  alert: boolean;
  msg : String ;
  popoverTitle1 = 'Confirmation de blocage';
  popoverMessage1 = 'Veuillez-vous vraiment bloquer cette étudiant ? ';
  confirmClicked = false;
  cancelClicked = false;
  popoverTitle2 = 'Confirmation de déblocage';
  popoverMessage2 = 'Veuillez-vous vraiment débloquer cette étudiant ?';

  constructor(public dialog: MatDialog,private EtudiantService:EtudiantService) { }

 

  ngOnInit(): void {
    this.EtudiantService.getAllEtudiant().subscribe(
      (res)=>{this.listEtudiant=res;},
      (err)=>{console.log(err);
      }
    )
  }
  bloquer(id: any){
    this.EtudiantService.bloquerEtudiant(id,false).subscribe(
      (res)=>{this.ngOnInit();
        var messag="L'etudiant a été bloquée avec succée";
        this.alert=true;
        this.msg=messag;},
      (err)=>{console.log(err);
      }
    )
  }
 
  debloquer(id: any){
    this.EtudiantService.debloquerEtudiant(id,true).subscribe(
      (res)=>{this.ngOnInit();
        var messag="L'étudiant a été débloquée avec succée";
        this.alert=true;
        this.msg=messag;},
      (err)=>{console.log(err);
      }
    )
  }




  openDialogModif(idd: any){

    const dialogConfig =new MatDialogConfig(); 
  dialogConfig.disableClose =true;
  dialogConfig.autoFocus =true;
  const dialogRef = this.dialog.open(UpdateEtudiantComponent , {data: {id: idd}, width: '810px' }, );
  dialogRef.afterClosed().subscribe((result) => {
   this.ngOnInit();
   if(result==true){
    var messag="L'etudiant a été bien modifié";
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
