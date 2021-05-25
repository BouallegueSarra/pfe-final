import { Component, OnInit ,ElementRef, ViewChild} from '@angular/core';
import { CoursService } from 'src/app/services/cours.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Section } from 'src/app/models/section';

import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-update-paragraphe',
  templateUrl: './update-paragraphe.component.html',
  styleUrls: ['./update-paragraphe.component.css'],
  providers: [DatePipe]
})
export class UpdateParagrapheComponent implements OnInit {
  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;
  @ViewChild('fileInputVideo', {static: false}) fileInputVideo: ElementRef;

  filetype : any; 
  modifier :  FormGroup; 
  infopargraphe:any;
  data :any; 
  filetypeVideo: any; 
  constructor(@Inject(MAT_DIALOG_DATA) public dataParag: any,private datePipe: DatePipe,private coursService :CoursService ,private router: Router,private route: ActivatedRoute,private fb: FormBuilder)
   { 

  let  FormControls ={
    titre : new FormControl('', [
       Validators.required, 
       Validators.pattern('^[a-zA-Z]+$'),
       Validators.minLength(2)
    ]),
    description : new FormControl('', [
        Validators.required, 
        Validators.minLength(30)
   ])
   
    
 }
this.modifier=this.fb.group(FormControls);
  }
  get titre (){ return this.modifier.get('titre'); }
  get description (){ return this.modifier.get('description'); }
 

  id =this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
this.coursService.afficheinfoParagraphe(this.dataParag.id).subscribe(
  (res)=>{
    this.data=res ;         
    this.modifier.patchValue({
       titre: this.data['titre'], 
       description : this.data['description'],
       image : this.data['image'],
       video : this.data['video'],

      
      
      })
  },  
 (err)=>{console.log(err); }
); 
    
  }

updatepargraphe(){

 

  this.coursService.afficheinfoParagraphe(this.dataParag.id).subscribe(
    (res)=>{
     this.infopargraphe=res;
     let data= this.modifier.value; 
         
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
     
   let photo=data.titre+this.infopargraphe.id_cours+myyDate+'.'+this.filetype;
   let video=data.titre+this.infopargraphe.id_cours+myyDate+'.'+this.filetypeVideo;


  let sec=new Section(data.titre,data.description,photo,video,this.infopargraphe.id_cours);

  this.coursService.uploadImgParag(this.infopargraphe.id_cours,data.titre,file).subscribe(
    (res)=>{console.log(this.dataParag.id+'.'+this.filetype);},
    (err)=>{console.log(err);})


  this.coursService.uploadVideoSection(this.infopargraphe.id_cours,data.titre,filevideo).subscribe(
      (res)=>{console.log(this.dataParag.id+'.'+this.filetypeVideo);},
      (err)=>{console.log(err);})            

this.coursService.updateParagraphe(sec,this.dataParag.id).subscribe(

(res)=>{console.log(res);
  this.router.navigate(['/detailsCours']);
},(err)=>{console.log(err);}

)

},(err)=>{console.log(err);}
);
  
}
}
