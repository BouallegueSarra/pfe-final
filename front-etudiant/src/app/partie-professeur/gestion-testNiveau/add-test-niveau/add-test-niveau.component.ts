import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {FormGroup, FormBuilder, FormControl, Validators, FormArray} from '@angular/forms';
import { Test } from 'src/app/models/test';
import { TestService } from 'src/app/services/test.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-test-niveau',
  templateUrl: './add-test-niveau.component.html',
  styleUrls: ['./add-test-niveau.component.css']
})
export class AddTestNiveauComponent implements OnInit   {
  QCMForm: FormGroup;

  constructor(private fb: FormBuilder,private testService :TestService, private router: Router){ let  FormControls ={

    question : new FormControl('', [Validators.required]), 
    reponse1 : new FormControl('', [Validators.required]), 
    reponse2 : new FormControl('', [Validators.required]),
    reponse3 : new FormControl('', [Validators.required]),
    reponse4 : new FormControl('', [Validators.required]),
    correct : new FormControl('', [Validators.required]),
    
   
 }
 this.QCMForm=this.fb.group(FormControls); 
}

get question (){ return this.QCMForm.get('question'); }
get reponse  (){ return this.QCMForm.get('reponse1'); }
get reponse2 (){ return this.QCMForm.get('reponse2'); }
get reponse3 (){ return this.QCMForm.get('reponse3');}
get reponse4 (){ return this.QCMForm.get('reponse4');}
get correct  (){ return this.QCMForm.get('correct');}

ngOnInit() {
 
}


  addTest(){
      let test1 =this.QCMForm.value; 
      test1.reponse =[test1.reponse1,test1.reponse2, test1.reponse3, test1.reponse4];
      var currentUser = JSON.parse(localStorage.getItem('token')); 
      let token = currentUser.token;
      let id =currentUser.id; 
  
     let test= new Test(test1.question,test1.reponse, test1.correct, 'niveau',false,id, null,null);
       this.testService.addTestNiveau(test).subscribe(
      
        (res)=>{ console.log("ajout avec succes");
        this.router.navigate(['/afficheTestNiveau']);
        }, 
       (err)=>{console.log(err);} 
      )
  }
     

 }







 
