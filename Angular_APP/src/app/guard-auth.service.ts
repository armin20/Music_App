import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})


export class GuardAuthService {

  constructor(private router: Router, private Auth: AuthService) { }

  canActivate(): boolean{
    if(!this.Auth.isAuthenticated()){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
  
}
