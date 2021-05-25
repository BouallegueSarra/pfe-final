import { Component, OnInit , Input, Output, EventEmitter, DoCheck} from '@angular/core';
import { TestService } from '../services/test.service';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-question-evaluation',
  templateUrl: './question-evaluation.component.html',
  styleUrls: ['./question-evaluation.component.css'], 
  
})
export class QuestionEvaluationComponent implements OnInit, DoCheck {
  @Input() questionIndex: number;
  @Output() answers =new EventEmitter<{user_answer: string, correct_answer: string,bareme:number}>();
  @Output() totalQuestions = new EventEmitter<number>();
  @Output() repUser = new EventEmitter<string>();


  currentQuestion: string;
  currentOptions: string;
  listeTest:any;


  constructor(private testService:TestService, private fb: FormBuilder) { 

  }

  ngOnInit(): void {
    var currentUser = JSON.parse(localStorage.getItem('token')); 
    let token = currentUser.token;
    let id =currentUser.id; 
    console.log("id de user connectée  ", id);
    this.testService.passerTestEvaluation(id).subscribe(
      (res)=>{this.listeTest=res;
        // console.log("mflemlfemlfmefl   ", this.listeTest);
        // this.currentQuestion = this.listeTest[this.questionIndex].question;
        // console.log("this.currentQuestion  ", this.currentQuestion);

        this.totalQuestions.emit(this.listeTest.length);
      }, 
      (error)=>{console.log(error);}
    )
  }

 

  ngDoCheck(): void {
    this.currentQuestion = this.listeTest[this.questionIndex].question;
    console.log("this.currentQuestion  ", this.currentQuestion);
    
    this.currentOptions = this.listeTest[this.questionIndex].reponse;
    console.log("this.currentOptions  ", this.currentOptions);
    
  }

  setUserAnswer(option: string) {
    console.log("option  ", option);
    

    let userAnswer = option;
    console.log("user an  ", userAnswer);
    
    let correctAnswer = this.listeTest[this.questionIndex].correct;
    console.log("corrr an  ", correctAnswer);

    let param = this.listeTest[this.questionIndex].bareme;
    console.log("param an  ", param);
    this.answers.emit({user_answer: userAnswer, correct_answer: correctAnswer, bareme:param});
    this.repUser.emit(option);

  }


  goNext() {
    
    

    

    this.questionIndex++;
  }
}
