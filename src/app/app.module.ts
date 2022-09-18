import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService } from './services/auth-guard.service';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { LandingComponent } from './components/landing/landing.component';
import { HomeComponent } from './components/home/home.component';
import { PaginaNoEncontradaComponent } from './components/shared/pagina-no-encontrada/pagina-no-encontrada.component';
import { MenuComponent } from './components/shared/menu/menu.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginDialogComponent } from './components/shared/login-dialog/login-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { InputTextModule } from 'primeng/inputtext';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HomeComponent,
    PaginaNoEncontradaComponent,
    MenuComponent,
    LoginDialogComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,

    InputTextModule,
    
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    AuthGuardService,
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
