import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
    public _service: AuthService,) { }

  ngOnInit(): void {
    this._service.currentUser$.subscribe( user => {
      this.user = user;
    })
  }

  logout() {
    // Esto es una chapuza muy poco elegante pero no se ha pedido el logout
    this.user = {nombre: '', apellidos: '', telefono: '', password: ''};
    this.router.navigate(['/']);
    // this._service.currentUser$.next();
  }

}
