import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  authForm: any = {};
  isSubmitted: boolean = false;
//   remember: boolean = false;

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
//       remember: ['', Validators.required],
    });
  }

  get formControls() {
    return this.authForm.controls;
  }

  signIn() {
    this.isSubmitted = true;
    if (this.authForm.invalid) {
      return;
    }
    this.authService.signIn(this.authForm.value);
    if (this.authForm.get("email").value === "angular@enhanceit.com" && this.authForm.get("password").value === "3nh4nce1T2020") {
      this.router.navigateByUrl('/admin');
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }
}
