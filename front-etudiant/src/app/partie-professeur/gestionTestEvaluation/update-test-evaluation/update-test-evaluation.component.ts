import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Test } from 'src/app/models/test';
import { TestService } from 'src/app/services/test.service';
import { ActivatedRoute } from '@angular/router';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EtudiantService } from 'src/app/services/etudiant.service';
@Component({
  selector: 'app-update-test-evaluation',
  templateUrl: './update-test-evaluation.component.html',
  styleUrls: ['./update-test-evaluation.component.css']
})
export class UpdateTestEvaluationComponent implements OnInit {
  updateTest :  FormGroup; 
  inforUsers :any; 
  alert: boolean;
  msg : String ;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder, private testService :TestService, private etudiantService :EtudiantService, private router: Router,private route: ActivatedRoute) { 
    let  FormControls ={

      question : new FormControl('', [Validators.required]), 
      reponse1 : new FormControl('', [Validators.required]), 
      reponse2 : new FormControl('', [Validators.required]),
      reponse3 : new FormControl('', [Validators.required]),
      reponse4 : new FormControl('', [Validators.required]),
      correct : new FormControl('', [Validators.required]),
      bareme : new FormControl('', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')])


   }
   this.updateTest=this.fb.group(FormControls); 
}
    get question (){ return this.updateTest.get('question'); }
    get reponse1 (){ return this.updateTest.get('reponse1'); }
    get reponse2 (){ return this.updateTest.get('reponse2'); }
    get reponse3 (){ return this.updateTest.get('reponse3');}
    get reponse4 (){ return this.updateTest.get('reponse4');}
    get correct (){ return this.updateTest.get('correct');}
    get bareme (){ return this.updateTest.get('bareme');}

    id =this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {

    this.testService.getbyid(this.data.id).subscribe(
      (res)=>{
        let infoTest=res ;         
        this.updateTest.patchValue({
           question : infoTest['question'], 
           reponse1 : infoTest['reponse'][0],
           reponse2 : infoTest['reponse'][1],
           reponse3 : infoTest['reponse'][2],
           reponse4 : infoTest['reponse'][3],
           correct : infoTest['correct'] ,
           bareme : infoTest['bareme']
          })
          },   
     (err)=>{console.log(err); }
    ); 

  }

  updateTestEvaluation(){

    let data2= this.updateTest.value; 
    data2.reponse =[data2.reponse1,data2.reponse2, data2.reponse3,data2.reponse4];
    
    
    var currentUser = JSON.parse(localStorage.getItem('token')); 
    let token = currentUser.token;
    let idProf =currentUser.id; 
    
    this.etudiantService.getbyid(idProf).subscribe(
      (res)=>{this.inforUsers =res;
      let test=new Test(data2.question,data2.reponse, data2.correct, 'evaluation',true,idProf, this.inforUsers.niveau, data2.bareme) ;

      
      
       this.testService.updateTestNiveau(test,this.data.id).subscribe(
      (res)=>{ var messag="Le question a été bien modifié";
                this.alert=true;
                this.msg=messag;
                console.log(messag);
      },
      (err)=>{console.log(err);  }
     );

      }, 
      (err)=> {console.log(err);});
   }

}
