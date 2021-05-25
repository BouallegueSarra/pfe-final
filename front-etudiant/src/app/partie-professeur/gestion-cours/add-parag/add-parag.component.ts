
import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {FormGroup, FormBuilder, FormControl, Validators, FormArray} from '@angular/forms';
import { Test } from 'src/app/models/test';
import { TestService } from 'src/app/services/test.service';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';
import { DatePipe } from '@angular/common';
import { Section } from 'src/app/models/section';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-add-parag',
  templateUrl: './add-parag.component.html',
  styleUrls: ['./add-parag.component.css'],
  providers: [DatePipe]
})
export class AddParagComponent implements OnInit {
  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;
  @ViewChild('fileInputVideo', {static: false}) fileInputVideo: ElementRef;

  filetype : any; 
  ajoutForm: FormGroup;
  filetypeVideo :any;
  alert:any;
  ngOnInit() {}

  id =this.route.snapshot.paramMap.get('id');

  addCours(){
   
    let parag1 =this.ajoutForm.value;       
    const imagebd=this.fileInput.nativeElement.files[0];
    const file =new FormData(); 
    file.set('file',imagebd);    
     if(imagebd.type === 'image/png') {
       this.filetype = 'png';
     }
     if(imagebd.type === 'image/jpeg') {
        this.filetype = 'jpg';
     }   
     if(imagebd.type === 'image/jpg') {
      this.filetype = 'jpg';
   }  
   let myDate = new Date();
   let myyDate = this.datePipe.transform(myDate, 'yyyyMMddHHmmss');
   
  
   const videodb=this.fileInputVideo.nativeElement.files[0];
   const filevideo =new FormData(); 
   filevideo.set('file',videodb);    
    if(videodb.type === 'video/mp4') {
      this.filetypeVideo = 'mp4';
    }
    if(videodb.type === 'video/mp3') {
       this.filetypeVideo = 'mp3';
    }   


     let photo=parag1.titre+this.data.id+myyDate+'.'+this.filetype;
     let video=parag1.titre+this.data.id+myyDate+'.'+this.filetypeVideo;

     var currentUser = JSON.parse(localStorage.getItem('token')); 
     let token = currentUser.token;
     let id =currentUser.id; 
    let section1= new Section(parag1.titre, parag1.description,photo, video,this.data.id);
    
     this.coursService.uploadImgParag(this.data.id,parag1.titre,file).subscribe(
      (res)=>{console.log(this.data.id+'.'+this.filetype);},
      (err)=>{console.log(err);})

      this.coursService.uploadVideoSection(this.data.id,parag1.titre,filevideo).subscribe(
        (res)=>{console.log(this.data.id+'.'+this.filetypeVideo);},
        (err)=>{console.log(err);}) 
    this.coursService.addParagraphe(section1).subscribe(

      (res)=>{

        this.alert=true;
       this.router.navigate(['/detailsCours/', this.data.id]);

      
   
       }, 
      (err)=>{console.log(err);} 
      )

    
  }



  
   




  

constructor(@Inject(MAT_DIALOG_DATA) public data: any,private datePipe: DatePipe,private fb: FormBuilder,private testService :TestService, private router: Router,private route: ActivatedRoute, private coursService:CoursService){ let  FormControls ={

    titre : new FormControl('', [Validators.required]), 
    description : new FormControl('', [Validators.required]),
    image : new FormControl('', [
      Validators.required]),
    video : new FormControl('', [
        Validators.required])
 
 }
 this.ajoutForm=this.fb.group(FormControls); 
}

get titre (){ return this.ajoutForm.get('titre'); }
get description (){ return this.ajoutForm.get('description'); }
get image  (){ return this.ajoutForm.get('image'); }
get video  (){ return this.ajoutForm.get('video'); }


}
