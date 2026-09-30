import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'stripe-dialog.component',
  templateUrl: 'stripe-dialog.component.html',
  styleUrls: ['./stripe-dialog.component.scss']
})
export class NgxStripeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<NgxStripeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  save() {

  }

  cancel() {
    this.dialogRef.close();
  }
}
