import { Component, OnInit } from '@angular/core';
import { Test } from 'src/app/models/test';
import { TestService } from 'src/app/services/test.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateTestEvaluationComponent } from '../update-test-evaluation/update-test-evaluation.component';
import { AddTestEvaluationComponent } from '../add-test-evaluation/add-test-evaluation.component';

@Component({
  selector: 'app-consult-test-evaluation',
  templateUrl: './consult-test-evaluation.component.html',
  styleUrls: ['./consult-test-evaluation.component.css']
})
export class ConsultTestEvaluationComponent implements OnInit {
  listTest: any;
  listBareme: any;
  notee: number;
  id:any;
  popoverTitle1 = "Confirmation de l'archivement ";
  popoverMessage1 = 'Veuillez-vous vraiment archiver ce question ?';
  confirmClicked = false;
  cancelClicked = false;
  alert: boolean;
  msg : String ;
  modifier :  FormGroup; 

  constructor(private testService :TestService, public dialog: MatDialog, private fb: FormBuilder,private router: Router) { }
 



  ngOnInit(): void {
    var currentUser = JSON.parse(localStorage.getItem('token')); 
    let token = currentUser.token;
    this.id =currentUser.id; 
    console.log(this.id);
    
        
     this.testService.consultTestEval(this.id).subscribe(
       (res)=>{this.listTest=res;},
       (err)=>{console.log(err);
       }
     )
  }


  archiver(id: any){
    this.testService.archiver(id,false).subscribe(
      (res)=>{this.ngOnInit();
        
          var messag="La question a été archivée avec succès";
                this.alert=true;
                this.msg=messag;
      },
      (err)=>{console.log(err);
      }
    )
  }


openDialog(idd :any) {

  const dialogConfig =new MatDialogConfig(); 
  dialogConfig.disableClose =true;
  dialogConfig.autoFocus =true;
  const dialogRef = this.dialog.open(UpdateTestEvaluationComponent ,{data: {id: idd}, width: '810px' }, );
  dialogRef.afterClosed().subscribe((result) => {
   this.ngOnInit();
   if(result==true){
    var messag="La question a été modifié avec succès";
          this.alert=true;
          this.msg=messag;}
  },
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
  const dialogRef = this.dialog.open(AddTestEvaluationComponent, {
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