import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  usuario!: string;
  password!: string;

  constructor(
    public _guard: AuthGuardService,
    public dialogRef: MatDialogRef<LoginDialogComponent>) { }

  ngOnInit(): void {}

  login() {
    if(!!this.password) {
      this.generateHash(this.password).then( hash => {
        console.log(this.password, hash)
      })
    }
  }
  
  generateHash(str: string, algorithm = "SHA-512") {
    let strBuffer = new TextEncoder().encode(str);

    // use SubtleCrypto to generate the hash using the specified algorithm
    return crypto.subtle.digest(algorithm, strBuffer)
      .then(hash => {
        let result = '';
        const view = new DataView(hash);
        for (let i = 0; i < hash.byteLength; i += 4) {
              result += ('00000000' + view.getUint32(i).toString(16)).slice(-8);
        }
          return result;
      });
  }

}
