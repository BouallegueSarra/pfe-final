import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { DatePipe } from '@angular/common'
import {FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormArray} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { Contact } from 'src/app/models/contact';
import { EnvoyermessageComponent } from 'src/app/envoyermessage/envoyermessage.component';
@Component({
  selector: 'app-consult-list-etudiant',
  templateUrl: './consult-list-etudiant.component.html',
  styleUrls: ['./consult-list-etudiant.component.css'],
  providers: [DatePipe]
})
export class ConsultListEtudiantComponent implements OnInit {
  inforUsers:any; 
  form: FormGroup;
   contact :  FormGroup;
   myDate = new Date();
   infoProf:any;
   alert: boolean;
  msg : String ;
  constructor(private router: Router,private toastr: ToastrService,private EtudiantService:EtudiantService,private fb: FormBuilder,public dialog: MatDialog, private conctactService: ContactService) { 


    this.form = this.fb.group({
      checkArray: this.fb.array([], [Validators.required])
    })

    let  FormControls ={
  
  sujet : new FormControl('', [
         Validators.required, 
    ]),
    message : new FormControl('', [
      Validators.required, 
     ])
   }
 

 this.contact=this.fb.group(FormControls);
  }
  get sujet (){ return this.contact.get('sujet'); }
  get message (){ return this.contact.get('message'); }

 get checkArray(): FormArray {
   return <FormArray>this.form.controls.checkArray;
 }

 onCheckboxChange(e) {
  const checkArray: FormArray = this.form.get('checkArray') as FormArray;

  if (e.target.checked) {
    checkArray.push(new FormControl(e.target.value));
    
  } else {
    let i: number = 0;
    checkArray.controls.forEach((item: FormControl) => {
      if (this.inforUsers.value == e.target.value) {
        checkArray.removeAt(i);
        return;
      }
      i++;
    });
  }
}

submitForm() {
  console.log(this.form.value);  
}





openDialogAjout(tableau :any) {
  const dialogConfig =new MatDialogConfig(); 
  // dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;
  const dialogRef = this.dialog.open(EnvoyermessageComponent, {data: {tab: tableau}, 
    disableClose: true
  }
  
  );
}






  

  ngOnInit(): void {
    var currentUser = JSON.parse(localStorage.getItem('token')); 
    let token = currentUser.token;
    let id =currentUser.id;
    this.conctactService.afficheListeEtudiant(id).subscribe(
      (res)=>{this.inforUsers=res},
      (err)=>{console.log(err);
      }
    )

  }




  contacter(){
     var currentUser = JSON.parse(localStorage.getItem('token')); 
       let token = currentUser.token;
       let id =currentUser.id;

      this.EtudiantService.getbyid(id).subscribe(
        (res)=> { this.infoProf=res;
                let data= this.contact.value;
                 let tab =this.checkArray.value;
                 let cont =new Contact(tab,data.sujet, data.message, this.infoProf.email, this.myDate);  
                 this.conctactService.addContact(cont).subscribe(
                   (res)=>{
                    this.toastr.success('Le message a été envoyé avec succes');
                    this.router.navigate(['/listEtudiant']);
                  },
                   (err)=>{console.log(err);}
                   )
                },
        (err)=>{console.log(err);}
      )
  }

  

}
