import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import Constants from 'src/constants';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  usuario!: string;
  password!: string;

  constructor(
    public _service: AuthService,
    public dialogRef: MatDialogRef<LoginDialogComponent>) { }

  ngOnInit(): void {}

  login() {
    if(!!this.password) {
      this.generateHash(this.password).then( hash => {
        this._service.login(Constants.END_POINTS.USERS, this.usuario, hash)
        this.dialogRef.close();
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
