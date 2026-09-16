import { Component, OnInit, inject } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { MapLoaderService } from './services/map-loader-service.service';
import { catchError, of, Subject, takeUntil } from 'rxjs';
import { Thing } from './shared/model/models';
import { AngularFireModule } from '@angular/fire/compat';
import { ThingService } from './services/thing.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    GoogleMapsModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private thingService: ThingService) { 
    debugger
  }

  isMapLoaded = false;

  private mapLoaderService = inject(MapLoaderService);
  protected destroyed = new Subject<void>();

  things: { [id: number]: Thing; } = [];
  thingArr: Thing[] = []

  markerPosition: google.maps.LatLngLiteral = { lat: 26.342703577760624, lng: -80.07728885944596 };

  mapOptions = {
    center: { lat: 26.342703577760624, lng: -80.07728882944576 },
    zoom: 20,
    zoomControl: true,
    mapTypeId: 'satellite'
  };

  thingIcon = {
    url: 'boatIcon.png'
  };



  ngOnInit(): void {

    this.thingService.getThings((data) => {

      debugger

      this.thingArr = data;
    });


    this.thingArr.push({
      pos: this.markerPosition
    } as Thing);

    this.mapLoaderService.load()
      .then(() => {
        this.isMapLoaded = true;
        console.log('Google Maps loaded successfully');
      })
      .catch(err => {
        console.error('Failed to load Google Maps:', err);
      });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  onThingClick(evt: any) {
    alert('click')
  }
}