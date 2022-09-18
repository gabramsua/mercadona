import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/models/models';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  user!: User;

  constructor(
    public _service: AuthService,) { }

  ngOnInit(): void {
    this._service.currentUser$.subscribe( user => {
      this.user = user;
    })
  }

}
