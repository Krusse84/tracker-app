import { Component, Inject, NgZone } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogContent } from "@angular/material/dialog";
import { MatDivider } from "@angular/material/divider";
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from "@angular/material/card";
import { MatList, MatListItem } from "@angular/material/list";

@Component({
  selector: 'user-dialog.component',
  templateUrl: 'user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
  imports: [MatDivider, MatDialogActions, MatDialogContent, MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatList, MatListItem]
})
export class UserDialog {
  constructor(
    public dialogRef: MatDialogRef<UserDialog>,
    private ngZone: NgZone,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.boatImage = `${data.thingData?.boatImage ? data.thingData.boatImage : this.noImage}`;
    this.avatarImage = `url(${data?.userData?.photoURL})`;
    this.model = data.thingData?.model;
    this.owner = data.userData?.displayName
  }

  toBase64 = (file:any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  avatarImage: string = '';
  model: string = '';
  boatImage: string = '';
  noImage: string = '../assets/NO_IMAGE.png';
  fileToUpload: File | null = null;
  editModel: boolean = false;
  owner: string = '';

  save() {
    this.dialogRef.close({
      boatImage: this.boatImage,
      model: this.model,
      avatarImage: this.avatarImage,
      owner: this.owner
    });
  }

  cancel() {
    this.dialogRef.close()
  }

  onkey(event: any) {
    if (event.key === 'Enter') {
      this.editModel = false;
    }

    this.model = event.target.value;
  }

  async uploadImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      if (file.type !== 'image/jpeg') {
        alert('Unsuported file type!');

        return;
      }

      /*if(file.size > 1000000) {
        alert('Maximun file size allowed is 1MB!');

        return;
      }*/

      const base64file = await this.toBase64(file);

      this.boatImage = base64file as string;
    }

  }
}
