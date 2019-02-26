import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, Params } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  constructor(public userService: UserService , private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }
  

  ngOnInit() {
  }

  login(user) {
    console.log(user)
    return this.userService.loginUser(user).subscribe((res) => {
      this.router.navigate(['todos']);
      console.log("valide");

    });
  }

}
