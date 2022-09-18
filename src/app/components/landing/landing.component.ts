import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Constants from 'src/constants';
import { Tornillo, User } from 'src/models/models';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../shared/login-dialog/login-dialog.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  user!: User;
  tornillos: Tornillo[] = [];

  constructor(
    public _service: AuthService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this._service.tornillos$.subscribe( tornillos => {
      this.tornillos = tornillos;
    })
    this.getTornillos();

  }
  getTornillos() {
    this._service.getAll(Constants.END_POINTS.TORNILLOS);
  }

  login() {
    this.dialog.open(LoginDialogComponent);
  }
}
