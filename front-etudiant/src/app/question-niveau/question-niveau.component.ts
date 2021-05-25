import { Component, OnInit, DoCheck , Input, Output, EventEmitter} from '@angular/core';
import { TestService } from '../services/test.service';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-question-niveau',
  templateUrl: './question-niveau.component.html',
  styleUrls: ['./question-niveau.component.css']
})
export class QuestionNiveauComponent implements OnInit , DoCheck {

  @Input() questionIndex: number;
  @Output() answers = new EventEmitter<{user_answer: string, correct_answer: string}>();
  @Output() totalQuestions = new EventEmitter<number>();

  currentQuestion: string;
  currentOptions: String[];
  questions :any; 
  listeTest :any; 
  quiz :  FormGroup; 
  disable :boolean=true; 
  form :  FormGroup; 
  msg:any;

  constructor(private testService:TestService, private fb: FormBuilder) {}


  ngOnInit(): void {
     this.testService.passerTest().subscribe(
       (res)=>{this.listeTest=res;
       this.totalQuestions.emit(this.listeTest.length);}, 
       (error)=>{console.log(error);}
     )
     this.disable=true; 
  }
  ngDoCheck(): void {
    this.currentQuestion = this.listeTest[this.questionIndex].question;
    this.currentOptions = this.listeTest[this.questionIndex].reponse; 
  } 


  setUserAnswer(option: string) {
    
    let userAnswer = option;
    
    
    let correctAnswer = this.listeTest[this.questionIndex].correct;
    this.answers.emit( {user_answer: userAnswer, correct_answer: correctAnswer});
    this.disable=false; 


  }

}
