import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/models/models';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  user!: User;
  loginForm!: FormGroup;
  telefono = new FormControl('', [Validators.required]);

  constructor(
    public _service: AuthService,
    public _guard: AuthGuardService,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    // this._service.currentUser$.subscribe( user => {
    //   this.user = user;
    // })
    // if(this.user)this.login();

    this.loginForm = this._formBuilder.group({
      password: ['', Validators.required]
    });
  }

  login() {
    console.log('click login')
  }
}
