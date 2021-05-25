import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { EtudiantService } from './services/etudiant.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private EtudiantService:EtudiantService){}
  roleAs:any;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let isLoggedIn= this.EtudiantService.isLoggedIn();
      if (isLoggedIn){
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
 
      }
    return true;
  }
  getRole() {
    this.roleAs = localStorage.getItem('ROLE');
    return this.roleAs;
  }


  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.EtudiantService.isLoggedIn()) {
      const userRole = this.getRole();
      console.log("role   ", userRole);
      
      // if (route.data.role && route.data.role.indexOf(userRole) === -1) {
      //   // this.router.navigate(['/home']);
      //   return false;
      // }
      return true;
    }

    this.router.navigate(['/home']);
    return false;
  }
  
}
