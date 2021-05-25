import { Component, OnInit, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { Certificat } from '../models/certificat';
import { Etudiant } from '../models/etudiant';
import { EtudiantService } from '../services/etudiant.service';
import { TestService } from '../services/test.service';
import {FormGroup, FormBuilder, FormControl, Validators, NgForm} from '@angular/forms';
import { QuestionEvaluationComponent } from '../question-evaluation/question-evaluation.component';


@Component({
  selector: 'app-quiz-evaluation',
  templateUrl: './quiz-evaluation.component.html',
  styleUrls: ['./quiz-evaluation.component.css']
})
export class QuizEvaluationComponent implements OnInit {

  
  init :number;
  public counter:number=0;
  currentIndex =0 ;
  answers : any ; 
  score =0; 
  totalQuestions:  any; 
  quizOver: Boolean;
  inforUsers :any; 
  niveau: String; 
  nouv_niv: String; 
  bareme: any;
  listeTest : any;
  id_test :any =[]; 
  repUser:any;
  test:  FormGroup; 
  minute:any;
  param:any; 


  constructor(private testService:TestService, private fb: FormBuilder,private EtudiantService: EtudiantService) {
   
  }


  ngOnInit(): void {
        var currentUser = JSON.parse(localStorage.getItem('token')); 
    let token = currentUser.token;
    let id =currentUser.id;
    this.EtudiantService.getbyid(id).subscribe(
    (res)=> { this.inforUsers=res;},
    (err)=>{console.log(err);})

    this.testService.getNoteTest(id).subscribe(
(res)=>{
this.param=res; 
this.init=this.param[0].time;

this.startCountDown();

}, 
(err)=>{console.log(err);
}

    )


    
 }
 
  startCountDown(){
// if(this.init>=60) {
//   this.minute=1;
//   this.counter=this.init%60;
//  }
    
      if (this.init && this.init>0 ){
          this.counter=this.init; 
         
         setTimeout(()=>{
      
          this.counter =this.counter-1; 
          this.processCount();},1000); 
          this.counter ==0;



      }
  }
  
  
  doCountdown(){
    
      setTimeout(()=>{
      
      this.counter =this.counter-1; 
      this.processCount();},1000); 
      this.counter ==0;
  }
  
  processCount(){
      if (this.counter ==0 ){
        this.endQuiz();
      }
      if(this.currentIndex==this.totalQuestions){
         this.quizOver=true  
      }
      else
this.doCountdown();
  }




  goNext() {

    

    

    this.currentIndex++;
    this.updateScore();
  
    if (this.currentIndex === this.totalQuestions){
      this.endQuiz();
    }

    if(this.answers.user_answer==''){
      console.log("videeeee ");
      
    }
  }


  receiveAnswers(receivedAnswers) {
    this.answers = receivedAnswers;
    // console.log("oppppppppppppppppppppp ", this.repUser);
    
    
    console.log("answer  ",this.answers);

  }


  reponses(reponses){
    this.repUser=reponses; 

    console.log("lllllll ", this.repUser);
    if(this.repUser==''){
      console.log("vide");
      
    }
    
  }
  updateScore(){
    if (this.answers.user_answer === this.answers.correct_answer) {
      console.log("this.answers.correct_answer  ", this.answers.correct_answer);
      console.log("this.answers.user_answer  ", this.answers.user_answer);
      
      this.score=this.score+this.answers.bareme;
      console.log("score   ", this.score);
    }

     console.log("bareme de question   ", this.answers.bareme);
      
    
    console.log("score final  ", this.score);

    var currentUser = JSON.parse(localStorage.getItem('token')); 
    let token = currentUser.token;
    let id =currentUser.id;
    
    




    this.testService.getNoteTest(id).subscribe(
      (res)=>{this.bareme=res;
        console.log("bareme de test  ", this.bareme[0].note);
        
        console.log("scoreeeeee       ", this.score);
        
                if (this.score>=this.bareme[0].note){ 
                  if (this.inforUsers.niveau=='A1'){ 
                    this.nouv_niv='A2';
                  }
                  else if (this.inforUsers.niveau=='A2'){ 
                    this.nouv_niv='B1';
                  }
                  else if (this.inforUsers.niveau=='B1'){ 
                    this.nouv_niv='B2';
                  }
                  else if (this.inforUsers.niveau=='B2'){ 
                    this.nouv_niv='C1';
                  }
                  else { 
                    this.nouv_niv='C2';
                  }
                console.log("nouveau niveau ", this.nouv_niv );
                
              this.EtudiantService.getbyid(id).subscribe(
                (res)=> { this.inforUsers=res;
                          this.testService.passerTestEvaluation(id).subscribe(
                            (res)=>{this.listeTest=res;}, 
                            (error)=>{console.log(error);}
                            )
                        },
              (err)=>{console.log(err);} )
            for (let i=0 ; i<this.listeTest.length; i++){
              this.id_test[i] =this.listeTest[i]._id; 
            }
            console.log("tessssssss ",this.id_test);
            
            let certif =new Certificat(this.id_test,this.inforUsers.niveau, id);
            console.log("info of certif   ", certif);
            
            this.testService.addCertificat(certif).subscribe(
              (res)=>{
                      let etudiant=new Etudiant(this.inforUsers.nom,this.inforUsers.prenom, this.inforUsers.email, this.inforUsers.mot_passe,'etudiant', this.inforUsers.telephone, this.inforUsers.date_naissance, this.inforUsers.genre,this.nouv_niv, true, this.inforUsers.photo) ;
                      this.testService.updateNiveau(id,etudiant).subscribe(
                          (res)=>{console.log(res);}, 
                          (err)=>{console.log(err); }
                          )
                      }, 
              (err)=>{console.log(err);}
            )
        
     }// end if loula
  }, 
  
     (err)=>{console.log(err);}
   )


}


getTotalQuestions(totalQuestions: number) {
  this.totalQuestions = totalQuestions;
}

endQuiz(){
  this.quizOver = true;
}
 
}
