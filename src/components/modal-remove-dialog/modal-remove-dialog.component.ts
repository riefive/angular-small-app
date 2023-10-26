import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-remove-dialog',
  templateUrl: './modal-remove-dialog.component.html',
  styleUrls: ['./modal-remove-dialog.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class ModalRemoveDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ModalRemoveDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.data.isYes = true
  }

  ngOnInit() {
  }
}
