import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Constants from 'src/constants';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {
  
  public form!: FormGroup;
  formatos = ['A', 'B', 'C', 'D'];
  
  constructor(
    fb:FormBuilder,
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    private router: Router,
    private _service: AuthService) { 

    this.form = fb.group({
      nombre:['' , Validators.required],
      precio:[0 , Validators.required],
      formato:['' , Validators.required],
      marca:['' , Validators.required]
    })
}

  ngOnInit(): void {
  }
  cancelar() {
    this.dialogRef.close();
  }
  guardar() {
    this._service.save(Constants.END_POINTS.TORNILLOS, this.form.value)
    .then(() => {
      this.router.navigate(['/home']);
      this.dialogRef.close();
    })
  }

}
