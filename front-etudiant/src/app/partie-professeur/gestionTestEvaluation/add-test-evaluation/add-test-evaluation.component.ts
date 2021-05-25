import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {FormGroup, FormBuilder, FormControl, Validators, FormArray} from '@angular/forms';
import { Test } from 'src/app/models/test';
import { TestService } from 'src/app/services/test.service';
import { Router } from '@angular/router';
import { EtudiantService } from 'src/app/services/etudiant.service';

@Component({
  selector: 'app-add-test-evaluation',
  templateUrl: './add-test-evaluation.component.html',
  styleUrls: ['./add-test-evaluation.component.css']
})
export class AddTestEvaluationComponent implements OnInit {
  QCMForm: FormGroup;
  infoUser : any;



  constructor(private fb: FormBuilder,private testService :TestService, private router: Router,  private EtudiantService:EtudiantService){ let  FormControls ={

    question : new FormControl('', [Validators.required]), 
    reponse1 : new FormControl('', [Validators.required]), 
    reponse2 : new FormControl('', [Validators.required]),
    reponse3 : new FormControl('', [Validators.required]),
    reponse4 : new FormControl('', [Validators.required]),
    correct : new FormControl('', [Validators.required]),
    bareme : new FormControl('', [Validators.required
  ])

   
 }
 this.QCMForm=this.fb.group(FormControls); 
}
get question (){ return this.QCMForm.get('question'); }
get reponse1  (){ return this.QCMForm.get('reponse1'); }
get reponse2 (){ return this.QCMForm.get('reponse2'); }
get reponse3 (){ return this.QCMForm.get('reponse3');}
get reponse4 (){ return this.QCMForm.get('reponse4');}
get correct  (){ return this.QCMForm.get('correct');}
get bareme (){ return this.QCMForm.get('bareme');}

  ngOnInit() {

  }

  addTest(){
     let test1 =this.QCMForm.value; 
     test1.reponse =[test1.reponse1,test1.reponse2, test1.reponse3, test1.reponse4];    
    var currentUser = JSON.parse(localStorage.getItem('token')); 
    let token = currentUser.token;
    let id =currentUser.id; 
     this.EtudiantService.getbyid(id).subscribe(
      (res)=>{this.infoUser=res;

          let test= new Test(test1.question,test1.reponse, test1.correct, 'evaluation',true,id,this.infoUser.niveau, test1.bareme);
             this.testService.addTestNiveau(test).subscribe( 
                             (res)=>{this.router.navigate(['/afficheTestEvaluation']); }, 
                              (err)=>{console.log(err);} 
              )
            },
             (err)=>{console.log(err);
             }
     )
   }






  }