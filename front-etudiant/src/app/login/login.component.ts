import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { Etudiant } from '../models/etudiant';
import { EtudiantService } from '../services/etudiant.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authentificationForm : FormGroup; 
  alert: boolean;
  msg : String ;
  constructor(private fb: FormBuilder, private router: Router, private EtudiantService:EtudiantService) {

    let  FormControls ={
       email : new FormControl('', [
         Validators.required, 
         Validators.email,
        ]),
        mot_passe : new FormControl('', [
         Validators.required, 
         Validators.minLength(6)])
   }
   this.authentificationForm=this.fb.group(FormControls);
 }
 
 get email (){ return this.authentificationForm.get('email'); }
 get mot_passe (){ return this.authentificationForm.get('mot_passe');}



  ngOnInit(): void {
    let logged = this.EtudiantService.isLoggedIn(); 
    if (logged){
      this.router.navigate(['/login']);
    }
  }

  loginEtudiant(){   
    let auth= this.authentificationForm.value;
    this.EtudiantService.login(auth).subscribe(
      (res)=> { 
        localStorage.setItem('token', JSON.stringify(res));
        var currentUser = JSON.parse(localStorage.getItem('token')); 
        let token = currentUser.token;
        let role =currentUser.role;
        let id =currentUser.id; 
        this.router.navigate(['/profil']);  
        

      },
      (err)=>{console.log(err); 
        this.alert=false; 
        this.msg =err.error;
        }
    )
  } 






































  } //end export 


