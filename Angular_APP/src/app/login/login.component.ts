import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import User from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User ={
    userName: "",
    password: "", 
    _id: "",
  }
  warning: String = "";
  loading: boolean = false;

  constructor(private router: Router, private Auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(formName: NgForm): void{
    if(this.user.userName !== "" && this.user.password !== ""){
      this.loading = true;
      this.Auth.login(this.user).subscribe(result=>{
        if(result){
          this.loading = false;
          
          localStorage.setItem('access_token', result.token);
          console.log(localStorage);
          this.router.navigate(['/newReleases']);
        }
      }, (err)=>{
        this.loading = false;
        this.warning = err.error.message;
      });
    }
  }
}
