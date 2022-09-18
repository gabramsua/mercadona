import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from 'src/models/models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  user!: User;

  constructor(
    private router: Router,
    public _service: AuthService
  ) { 
    this._service.currentUser$.subscribe((user: any) => {
      this.user = user;
    })
  }


  canActivate() {
    return this.checkUserLogin()
      
  }
  checkUserLogin(): boolean {
    // TODO: Hacer con Observable: if ( localStorage.getItem('currentUser') ) return true;
    if(!!this.user) return true;
    else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
