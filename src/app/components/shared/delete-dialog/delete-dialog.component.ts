import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Constants from 'src/constants';

@Component({
  selector: 'delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {
  @Input() idToDelete!: string;
  @Output() accionCancel = new EventEmitter();
  @Output() accionDelete = new EventEmitter();

  constructor(private _service: AuthService) { }

  ngOnInit(): void {
    console.log(this.idToDelete)
  }
  cancel() {
    this.accionCancel.emit();
  }
  eliminar() {
    this._service.delete(Constants.END_POINTS.TORNILLOS, this.idToDelete)
    .then(() => {
      this.accionDelete.emit();
    })
  }

}
