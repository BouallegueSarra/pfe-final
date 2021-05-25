import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {FormGroup, FormBuilder, FormControl, Validators, FormArray} from '@angular/forms';
import { Test } from 'src/app/models/test';
import { TestService } from 'src/app/services/test.service';
import { Router } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';
import { Cours } from 'src/app/models/cours';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { DatePipe } from '@angular/common';
import { Section } from 'src/app/models/section';

@Component({
  selector: 'app-add-cours',
  templateUrl: './add-cours.component.html',
  styleUrls: ['./add-cours.component.css'],
  providers: [DatePipe]
})
export class AddCoursComponent implements OnInit {
  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;
  @ViewChild('fileInputVideo', {static: false}) fileInputVideo: ElementRef;

  filetype:any; 
  coursForm : FormGroup; 
  id: any; 
  inforUsers: any; 
  listcours: any;
  filetypeVideo: any; 
  alert:any; 
 
  constructor(private datePipe: DatePipe,private fb: FormBuilder,private coursService :CoursService, private router: Router, private EtudiantService: EtudiantService){

    let  FormControls ={
      titre : new FormControl('', [
         Validators.required, 
         Validators.minLength(2)]),
      
      soustitre : new FormControl('', [
        Validators.required, 
        Validators.minLength(2)]),
     
        description : new FormControl('', [
      Validators.required]),
      image : new FormControl('', [
        Validators.required]),
      video : new FormControl('', [
          Validators.required])
      
   }
      this.coursForm=this.fb.group(FormControls); 
  }
  get titre (){ return this.coursForm.get('titre'); }
  get soustitre (){ return this.coursForm.get('soustitre'); }
  get description (){ return this.coursForm.get('description'); }
  get image (){ return this.coursForm.get('image'); }
  get video (){ return this.coursForm.get('video'); }


  ngOnInit() {
  
  }

  addCours(){

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
  

    var currentUser = JSON.parse(localStorage.getItem('token')); 
    let token = currentUser.token;
    this.id =currentUser.id;
    
    this.EtudiantService.getbyid(this.id).subscribe(
      (res)=> { this.inforUsers=res; console.log(this.inforUsers);
      
        let cour=this.coursForm.value; 
                     let cours=new Cours (cour.titre, this.id, true, this.inforUsers.niveau); 
                     this.coursService.addCours(cours).subscribe(
                                        (res)=> { this.listcours=res; 
                                         let photo=cour.soustitre+this.listcours._id+myyDate+'.'+this.filetype;
                                         let video=cour.soustitre+this.listcours._id+myyDate+'.'+this.filetypeVideo;

                                         this.coursService.uploadImgParag(this.listcours._id,cour.soustitre,file).subscribe(
                                                                (res)=>{console.log("ajout avec succes");},
                                                               (err)=>{console.log(err);})
                                                             
                                        this.coursService.uploadVideoSection(this.listcours._id,cour.soustitre,filevideo).subscribe(
                                            (res)=>{console.log(this.id+'.'+this.filetypeVideo);},
                                            (err)=>{console.log(err);})            

                        let sec= new Section(cour.soustitre, cour.description,photo, video,this.listcours._id);      
                        this.coursService.addParagraphe(sec).subscribe(
                          (res)=>{console.log("ajout parag avec succes ");
                          this.alert=true;
                          this.router.navigate(['/afficheCours']);
                        },
                          (err)=>{console.log(err);})

                                        },
                                         (err)=>{console.log(err);
                                         }
                     )  
      },
      (err)=>{console.log(err);
    }
    )
  }


}
