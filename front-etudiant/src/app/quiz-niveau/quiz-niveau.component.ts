import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../models/etudiant';
import { EtudiantService } from '../services/etudiant.service';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-quiz-niveau',
  templateUrl: './quiz-niveau.component.html',
  styleUrls: ['./quiz-niveau.component.css']
})
export class QuizNiveauComponent implements OnInit {
  currentIndex = 0;
  answers : any ; 
  score =0; 
  totalQuestions:  any; 
  quizOver: Boolean;
  niveau: String; 
  inforUsers :any; 
  msg :any; 
  option:  any; 



  constructor(private testService:TestService, private EtudiantService: EtudiantService) { }

  ngOnInit(): void {
    var currentUser = JSON.parse(localStorage.getItem('token')); 
    let token = currentUser.token;
    let id =currentUser.id;
    this.EtudiantService.getbyid(id).subscribe(
    (res)=> { this.inforUsers=res;},
    (err)=>{console.log(err);})
}
  
optionn(option: String) {
  this.option = option;  
  
}
  goNext() {
   this.currentIndex++;
    this.updateScore();

    if (this.currentIndex === this.totalQuestions){
    this.endQuiz();
  }
  }

  goPrevious() {
    this.currentIndex--;
  }

  receiveAnswers(receivedAnswers) {
    this.answers = receivedAnswers;

    this.msg = receivedAnswers.user_answer;
   
    console.log("receivedAndwerds   ", receivedAnswers);
    
  }

  updateScore(){
    if (this.answers.user_answer === this.answers.correct_answer) {
      this.score++;
    }
  
  }

  getTotalQuestions(totalQuestions: number) {
    this.totalQuestions = totalQuestions;
  }

 

  endQuiz(){
  this.quizOver = true;
  
  if (this.score==0){
    this.niveau='A1';
  }
  if (this.score<5){
    this.niveau='A2';
  }
  if (this.score>=5 && this.score<10){
    this.niveau='B1';
  }
  if (this.score>=10 && this.score<15){
    this.niveau='B2';
  }
  if (this.score>15 && this.score<20){
    this.niveau='C1';
  }
  if (this.score==20){
    this.niveau='C2';
  }

var currentUser = JSON.parse(localStorage.getItem('token')); 
let token = currentUser.token;
let id =currentUser.id;
this.EtudiantService.getbyid(id).subscribe(
  (res)=> { this.inforUsers=res;
  let etudiant=new Etudiant(this.inforUsers.nom,this.inforUsers.prenom, this.inforUsers.email, this.inforUsers.mot_passe,'etudiant', this.inforUsers.telephone, this.inforUsers.date_naissance, this.inforUsers.genre,this.niveau, true, this.inforUsers.photo) ;
          this.testService.updateNiveau(id,etudiant).subscribe(
                 (res)=>{console.log(res);}, 
                 (err)=>{console.log(err); }
          )
  },
  (err)=>{console.log(err);}
  
)

}


restartQuiz() {
  this.quizOver = false;
  this.score = 0;
  this.currentIndex = 0;
}
}
