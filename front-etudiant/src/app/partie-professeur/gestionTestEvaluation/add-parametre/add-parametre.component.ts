import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {FormGroup, FormBuilder, FormControl, Validators, FormArray} from '@angular/forms';
import { Test } from 'src/app/models/test';
import { TestService } from 'src/app/services/test.service';
import { Router } from '@angular/router';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { ParametreTest } from 'src/app/models/parametre-test';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-parametre',
  templateUrl: './add-parametre.component.html',
  styleUrls: ['./add-parametre.component.css']
})
export class AddParametreComponent implements OnInit {
  addParam: FormGroup;
  infoUser:any; 
  msg:any;
  alert:any; 
  constructor(private toastr: ToastrService,private fb: FormBuilder,private testService :TestService, private router: Router,  private EtudiantService:EtudiantService) { 
    let  FormControls ={
      note : new FormControl('', [Validators.required]), 
      timeQuestion : new FormControl('', [Validators.required]), 
    }
   this.addParam=this.fb.group(FormControls); 
  }
  get note (){ return this.addParam.get('note'); }
  get timeQuestion  (){ return this.addParam.get('timeQuestion'); }
 

  ngOnInit(): void {
  }

  addParametre(){
    let param =this.addParam.value; 
    var currentUser = JSON.parse(localStorage.getItem('token')); 
    let token = currentUser.token;
    let id =currentUser.id; 

    this.EtudiantService.getbyid(id).subscribe(
      (res)=>{this.infoUser=res;
          let param2= new ParametreTest(param.note, id, param.timeQuestion, this.infoUser.niveau);
              this.testService.addParametre(param2).subscribe( 
                    (res)=>{
                      this.toastr.success('Les parametre de test ont été ajoutée avec succès');

                      this.router.navigate(['/afficheTestEvaluation']);
                  
                  }, 
                    (err)=>{console.log(err);} 
              ) 
            },
             (err)=>{console.log(err);
             }
     )
  }

}
