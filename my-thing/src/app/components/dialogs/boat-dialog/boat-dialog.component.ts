import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions } from "@angular/material/dialog";
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from "@angular/material/card";
import { MatDivider } from "@angular/material/divider";
import { MatListItem, MatList } from "@angular/material/list";

@Component({
  selector: 'boat-dialog.component',
  templateUrl: 'boat-dialog.component.html',
  styleUrls: ['./boat-dialog.component.scss'],
  imports: [MatDialogContent, MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatDivider, MatListItem, MatList, MatDialogActions]
})
export class BoatDialog {
  constructor(
    public dialogRef: MatDialogRef<BoatDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.boatImage = `${data.thingData?.boatImage ? data.thingData?.boatImage : this.noImage}`;
    this.houseBattery = Math.round(data.thingData?.houseBattery * 100) / 100;
    this.speed = data.thingData?.speed > 5 ? Math.round(data.thingData?.speed) : 0;
  }

  getLat(value: any) {
    return `Lat: ${value}`
  }

  getLong(value: any) {
    return `Lon: ${value}`
  }

  getUpdatedString(date: any, time: any) {
    const DateTimeString = `20${date?.toString().substring(4, 6)}-${date?.toString().substring(2, 4)}-${date?.toString().substring(0, 2)}T${time?.toString().substring(0, 2)}:${time?.toString().substring(2, 4)}:${time?.toString().substring(4, 6)}Z`

    return new Date(DateTimeString).toLocaleString();
  }

  cancel() {
    this.dialogRef.close();
  }
 
  noImage: string = '../assets/NO_IMAGE.png';
  boatImage: string = '';
  houseBattery: number = 0;
  speed: number = 0;
}

