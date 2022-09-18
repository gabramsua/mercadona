import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  notAllowed$ = new Subject<string>();

  constructor(
    private router: Router
  ) { }


  canActivate() {
    return this.checkUserLogin()
      
  }
  checkUserLogin(): boolean {
    this.notAllowed$.next('Necesitas loguearte para poder entrar en esa sección.');

    // TODO: Hacer con Observable: if ( localStorage.getItem('currentUser') ) return true;
    
    this.router.navigate(['/']);
    return false;
  }
}
