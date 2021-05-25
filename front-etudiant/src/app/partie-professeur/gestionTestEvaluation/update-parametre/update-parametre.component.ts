import { Component, OnInit } from '@angular/core';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { FormsModule } from '@angular/forms';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Test } from 'src/app/models/test';
import { TestService } from 'src/app/services/test.service';
import { ParametreTest } from 'src/app/models/parametre-test';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-parametre',
  templateUrl: './update-parametre.component.html',
  styleUrls: ['./update-parametre.component.css']
})
export class UpdateParametreComponent implements OnInit {
  updateParam :  FormGroup; 
  inforUsers:any;

  constructor (private toastr: ToastrService,private fb: FormBuilder, private testService :TestService, private etudiantService :EtudiantService, private router: Router) { 
    let  FormControls ={

      note : new FormControl('', [Validators.required]), 
      timeQuestion : new FormControl('', [Validators.required])

     
   }
   this.updateParam=this.fb.group(FormControls); 
}
    get note (){ return this.updateParam.get('note'); }
    get timeQuestion (){ return this.updateParam.get('timeQuestion'); }




  ngOnInit(): void {
    var currentUser = JSON.parse(localStorage.getItem('token')); 
    let token = currentUser.token;
    let id =currentUser.id; 

    this.testService.verifParametre(id).subscribe(
      (res)=>{
        let infoParam=res ;    
             
        this.updateParam.patchValue({
           note : infoParam['note'], 
           timeQuestion : infoParam['time'],
          })
        },
     (err)=>{console.log(err); }
    ); 



  }



  updateParametre(){

    let data=this.updateParam.value;
    console.log("kfkf  ", data);
    var currentUser = JSON.parse(localStorage.getItem('token')); 
    let token = currentUser.token;
    let idProf =currentUser.id; 
    
     this.etudiantService.getbyid(idProf).subscribe(
       (res)=>{this.inforUsers =res;
       let param=new ParametreTest(data.note, idProf,data.timeQuestion, this.inforUsers.niveau);

       this.testService.updateParametre(idProf,param).subscribe(
         (res)=>{
           
          this.toastr.success('Les parametre de test ont été modifié avec succès');

 
          this.router.navigate(['/afficheTestEvaluation']);},
         (err)=>{console.log(err);}
        );
        }, 
       (err)=> {console.log(err);});
  }






}
