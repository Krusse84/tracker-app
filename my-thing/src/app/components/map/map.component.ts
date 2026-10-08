import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector, inject, NgZone, OnInit, runInInjectionContext } from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { combineLatest, Observable, Subject, takeUntil } from 'rxjs';
import { Database, ref, listVal, DatabaseReference, set } from '@angular/fire/database';
import { MapLoaderService } from '../../services/map-loader-service.service';
import { Thing } from '../../shared/model/models';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserDialog } from '../dialogs/user-dialog/user-dialog.component';
import { AuthService } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { ThingDialog } from '../dialogs/thing-dialog/thing-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  imports: [
    GoogleMapsModule,
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ]
})
export class MapComponent implements OnInit {

  constructor(
  ) {
    this.thingsRef = ref(this.database, 'things');

    this.things$ = listVal<Thing>(this.thingsRef, { keyField: 'id' });

    combineLatest([this.authService.user$, this.things$]).pipe(takeUntil(this.destroyed)).subscribe(async data => {
      await this.waitFor(() => data[1].find(x => x.id === data[0]?.uid));

      runInInjectionContext(this.injector, () => {
        this.currentThingRef = ref(this.database, `things/${data[0]?.uid}`);

        this.user = data[0];

        const currentThing = data[1].find(x => x.id === data[0]?.uid);

        this.things[this.user.uid] = currentThing as Thing;

        this.navigateToCurrentUser(currentThing as Thing, false);
      })
    });

    this.mapLoaderService.load()
      .then(() => {
        this.isMapLoaded = true;
        console.log('Google Maps loaded successfully');
      })
      .catch(err => {
        console.error('Failed to load Google Maps:', err);
      });
  }

  isMapLoaded = false;

  private thingsRef: DatabaseReference;
  private currentThingRef!: DatabaseReference;
  private authService = inject(AuthService);
  private readonly database = inject(Database);
  private mapLoaderService = inject(MapLoaderService);
  private readonly injector = inject(EnvironmentInjector);
  readonly userDialog = inject(MatDialog);
  readonly thingDialog = inject(MatDialog);
  readonly ngZone = inject(NgZone);
  readonly snackbar = inject(MatSnackBar)

  private map: any;
  private hover: { [id: number]: boolean; } = [];
  private clicked: { [id: number]: boolean; } = [];
  protected things: { [id: number]: Thing; } = [];
  protected user: any;
  protected destroyed = new Subject<void>();

  lat = 25.900219607920604;
  lng = -80.11941849694242;
  thingArr: Thing[] = []

  mapOptions = {
    center: { lat: 58.425428333, lng: 16.070794833 },
    zoom: 20,
    zoomControl: true,
    mapTypeId: 'satellite'
  };

  thingIcon = {
    url: 'thingIcon.png'
  };

  things$!: Observable<Thing[]>;

  ngOnInit(): void {

  }

  onMapInitialized(event: google.maps.Map) {
    this.map = event.data.getMap();

    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('Profile'));

    this.map.setOptions({
      zoomControl: 'true',
      mapTypeControl: 'true',
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER,
        style: google.maps.MapTypeControlStyle.DEFAULT
      },
      mapTypeId: 'satellite'
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  onThingClick(evt: any) {
    this.userDialog?.open(ThingDialog, {
      data: {
        userData: this.user,
        thingData: this.things[this.user.uid]
      }
    });
  }

  profileClicked() {
    this.userDialog?.closeAll();
    this.thingDialog?.closeAll();

    const dialogRef = this.userDialog?.open(UserDialog, {
      data: {
        userData: this.user,
        thingData: this.things[this.user.uid]
      }
    });

    dialogRef?.afterClosed().subscribe(data => {
      if (data) {
        runInInjectionContext(this.injector, () => {
          const currentThing = this.things[this.user.uid];

          set(this.currentThingRef, {
            ...currentThing,
            model: data.model,
            thingImage: data.thingImage,
            avatarImage: data.avatarImage,
            owner: data.owner
          })
        })

        this.snackbar.open(`Your profile is saved!`, '', {
          duration: 3000,
          panelClass: ['statusbar']
        });
      }
    });
  }

  navigateToCurrentUser(thing: Thing, openDialog: boolean) {
    if (thing) {
      this.lat = thing.pos.lat;
      this.lng = thing.pos.lng;

      this.map.setCenter({ lat: parseFloat(this.lat.toString()), lng: parseFloat(this.lng.toString()) });

      if(openDialog) {
        this.userDialog?.open(ThingDialog, {
        data: {
          userData: this.user,
          thingData: this.things[this.user.uid]
        }
      });
      }
    }
  }

  signOut() {
    this.ngZone.run(() => {
      this.authService.logout();
    })
  }

  waitFor(conditionFunction: any) {
    const poll = (resolve: any) => {
      if (conditionFunction())
        (
          resolve()
        )
      else {
        setTimeout(() => poll(resolve), 400);
      }
    }

    return new Promise(poll);
  }
}
