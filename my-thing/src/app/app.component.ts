import { Component, OnInit, inject } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { MapLoaderService } from './services/map-loader-service.service';
import { Observable, Subject } from 'rxjs';
import { Thing } from './shared/model/models';
import { Database, ref, listVal } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  imports: [
    GoogleMapsModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  isMapLoaded = false;

  private readonly database = inject(Database);
  private mapLoaderService = inject(MapLoaderService);
  protected destroyed = new Subject<void>();

  things: { [id: number]: Thing; } = [];
  thingArr: Thing[] = []

  mapOptions = {
    center: { lat: 58.425428333, lng: 16.070794833 },
    zoom: 20,
    zoomControl: true,
    mapTypeId: 'satellite'
  };

  thingIcon = {
    url: 'boatIcon.png'
  };

  things$!: Observable<Thing[]>;
  
  ngOnInit(): void {
    const thingsRef = ref(this.database, 'boats');
    
    this.things$ = listVal<Thing>(thingsRef, { keyField: 'id' });

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