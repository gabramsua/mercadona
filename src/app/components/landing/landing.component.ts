import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { AuthService } from 'src/app/services/auth.service';
import Constants from 'src/constants';
import { Tornillo, User } from 'src/models/models';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  user!: User;
  loginForm!: FormGroup;
  telefono = new FormControl('', [Validators.required]);
  tornillos!: Tornillo[];

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

    this._service.tornillos$.subscribe( tornillos => {
      this.tornillos = tornillos;
      console.log('TORNILLOS', tornillos)
    })
    this.getTornillos();

    this.loginForm = this._formBuilder.group({
      password: ['', Validators.required]
    });
  }
  getTornillos() {
    this._service.getAll(Constants.END_POINTS.TORNILLOS);
  }

  login() {
    console.log('click login')
  }
}
