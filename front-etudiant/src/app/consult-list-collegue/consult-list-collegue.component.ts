import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import {FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormArray} from '@angular/forms';
import { DatePipe } from '@angular/common'
import { Contact } from '../models/contact';
import { EtudiantService } from '../services/etudiant.service';
import { ContactComponent } from '../contact/contact.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { EnvoyermessageComponent } from '../envoyermessage/envoyermessage.component';
import { EnvoyermsgProfComponent } from '../envoyermsg-prof/envoyermsg-prof.component';

@Component({
  selector: 'app-consult-list-collegue',
  templateUrl: './consult-list-collegue.component.html',
  styleUrls: ['./consult-list-collegue.component.css'],
  providers: [DatePipe]
})

export class ConsultListCollegueComponent implements OnInit {
 
   infoProf: any; 
   listCollegue: any; 
   id:any;
   form: FormGroup;
   contact :  FormGroup;
   contactProf :  FormGroup;

   inforUsers:any;
   myDate = new Date();

   constructor(private router: Router,private toastr: ToastrService,private EtudiantService:EtudiantService,  public dialog: MatDialog,  private datePipe: DatePipe,private fb: FormBuilder, private conctactService:ContactService) {
     this.form = this.fb.group({
       checkArray: this.fb.array([], [Validators.required])
     })

     let  FormControls ={
      
      sujet : new FormControl('', [
          Validators.required
     ]),
     message : new FormControl('', [
       Validators.required
      ])
    }
  


  this.contact=this.fb.group(FormControls);
   }
   get email (){ return this.contact.get('email'); }

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
         if (this.listCollegue.value == e.target.value) {
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

   retour(){
     console.log("feremet");
     this.router.navigate(['/listCollegue']);
     this.ngOnInit(); 
     
   }

  ngOnInit(): void {
    var currentUser = JSON.parse(localStorage.getItem('token')); 
    let token = currentUser.token;
    this.id =currentUser.id;
    this.conctactService.afficheListeCollegue(this.id).subscribe(
      (res)=>{this.listCollegue=res; },
      (err)=>{console.log(err);}
    ) 

    this.conctactService.afficheInfoProf(this.id).subscribe(
      (res)=>{this.infoProf=res;},
     (err)=>{console.log(err);})
  }
  

  selectAll() {
    let checkBoxes = document.querySelectorAll('form-check-input ');
  }



  contacter(){
     var currentUser = JSON.parse(localStorage.getItem('token')); 
       let token = currentUser.token;
       let id =currentUser.id;

      this.EtudiantService.getbyid(id).subscribe(
        (res)=> { this.inforUsers=res;
                 let data= this.contact.value;

                   let tab =this.checkArray.value;

                       let cont =new Contact(tab,data.sujet, data.message, this.inforUsers.email, this.myDate);  
                  
                      this.conctactService.addContact(cont).subscribe(
                        (res)=>{console.log("ajout avec succes");
                        this.toastr.success('Le message a été envoyé avec succes');},
                        (err)=>{console.log(err);
                        }
                      )
            },
            (err)=>{console.log(err);}
      )
}

    
   
    contacterProf(){
   
      var currentUser = JSON.parse(localStorage.getItem('token')); 
         let token = currentUser.token;
         let id =currentUser.id;
         let data= this.contact.value;
  
         this.EtudiantService.getbyid(id).subscribe(
          (res)=> { this.inforUsers=res;
            let data= this.contact.value;
            
            this.conctactService.afficheInfoProf(this.id).subscribe(
              (res)=>{this.infoProf=res;
                
            let cont =new Contact(this.infoProf[0].email,data.sujet, data.message, this.inforUsers.email, this.myDate);              
            
            this.conctactService.addContact(cont).subscribe(
              (res)=>{
                this.toastr.success('Le message a été envoyé avec succes');
},
              (err)=>{console.log(err);
              }
            )
          },
            (err)=>{console.log(err);})
          
  
          },
          (err)=>{console.log(err);})
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


  openDialog(mail :any) {
    const dialogConfig =new MatDialogConfig(); 
    // dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(EnvoyermsgProfComponent, {data: {email: mail}, 
      disableClose: true
    }
    
    );
}

}















 




