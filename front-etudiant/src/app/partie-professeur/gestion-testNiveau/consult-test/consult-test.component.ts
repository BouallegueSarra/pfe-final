import { Component, OnInit } from '@angular/core';
import { Test } from 'src/app/models/test';
import { TestService } from 'src/app/services/test.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { UpdateTestComponent } from '../update-test/update-test.component';
import { AddTestNiveauComponent } from '../add-test-niveau/add-test-niveau.component';

@Component({
  selector: 'app-consult-test',
  templateUrl: './consult-test.component.html',
  styleUrls: ['./consult-test.component.css']
})
export class ConsultTestComponent implements OnInit {
  listTest: any;
  id:any;
  alert: boolean;
  msg : String ;

popoverTitle1 = 'Confirmation de suppression ';
  popoverMessage1 = 'Veuillez-vous vraiment supprimer ce question ?';
  confirmClicked = false;
  cancelClicked = false;
  constructor( public dialog: MatDialog,private testService :TestService) { }

  ngOnInit(): void {
    var currentUser = JSON.parse(localStorage.getItem('token')); 
    let token = currentUser.token;
    this.id =currentUser.id; 
    
    this.testService.afficheTestNiveau(this.id).subscribe(
      (res)=>{this.listTest=res;},
      (err)=>{console.log(err);
      }
    )
  }
  delete(id: any){
    this.testService.deleteTest(id).subscribe(
      (res)=>{this.ngOnInit();
        var messag="La question a été bien supprimé";
        this.alert=true;
         this.msg=messag;
      },
      (err)=>{console.log(err);
      }
    )
  }

  openDialog(idd :any) {

  const dialogConfig =new MatDialogConfig(); 
  dialogConfig.disableClose =false;
  dialogConfig.autoFocus =false;
  const dialogRef = this.dialog.open(UpdateTestComponent , {data: {id: idd}, width: '810px' }, );
  dialogRef.afterClosed().subscribe((result) => {
   this.ngOnInit();
   if(result==true){
   var messag="La question a été bien modifié";
        this.alert=true;
         this.msg=messag;
  }},
  (err)=>{{console.log(err);
    this.alert=false; 
    this.msg =err.error;         
  }}
  );
}


  openDialogAjout() {
    const dialogConfig =new MatDialogConfig(); 
    dialogConfig.disableClose =true;
    dialogConfig.autoFocus =true;
    const dialogRef = this.dialog.open(AddTestNiveauComponent,{
      width: '810px',
    }
    );
    dialogRef.afterClosed().subscribe((result) => {
     this.ngOnInit();
     if(result==true){
     var messag="La question a été bien ajoutée";
           this.alert=true;
           this.msg=messag;}
    },
    (err)=>{{console.log(err);
      this.alert=false; 
      this.msg =err.error;         
    }}
    );
   
}




 


}
