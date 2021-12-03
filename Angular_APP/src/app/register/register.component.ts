import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import RegisterUser from '../RegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerUser: RegisterUser = {
    userName: "",
    password: "",
    password2: "",
  };

  warning: String = "";
  success: boolean = false;
  loading: boolean = false;



  constructor(private Auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() : void {
    if(this.registerUser.userName !== "" && this.registerUser.password === this.registerUser.password2){
      this.loading = true;
      this.Auth.register(this.registerUser).subscribe(data =>{
          this.success = true;
          this.warning = "";
          this.loading = false;
          },(err)=> {
          this.success = false;
          this.warning = err.error.message;
          this.loading = false;
      });
    }
    if(this.registerUser.password !== this.registerUser.password2){
      this.warning = "Password does not match";
    }
  }
}
