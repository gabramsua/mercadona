import { Component } from '@angular/core';
import { User } from 'src/models/models';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Mercadona';
  user!: User;
  
  constructor(public _service: AuthService, public guardService: AuthGuardService){}

  ngOnInit(): void {
    this._service.currentUser$.subscribe( (user: User) => {
      this.user = user;
    })
    
    if(!this.user) {
      this.guardService.checkUserLogin()
    }
  }
}
