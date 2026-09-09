import { Component, OnInit, inject } from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { MapLoaderService } from '../services/map-loader-service.service';

@Component({
  selector: 'app-component',
  imports: [GoogleMapsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent implements OnInit {
  public isMapLoaded = false;
  private mapLoaderService = inject(MapLoaderService);

  // Single marker position
  public markerPosition: google.maps.LatLngLiteral = {
    lat: 19.098272,
    lng: 72.874928,
  };

  public mapOptions: google.maps.MapOptions = {
    center: { lat: 19.118, lng: 72.8673 },
    zoom: 16
  };

  ngOnInit(): void {
    this.mapLoaderService
      .load()
      .then(() => {
        this.isMapLoaded = true;
        this.mapOptions.center = this.markerPosition; // center on marker
      })
      .catch((err) => console.error('Failed to load Google Maps:', err));
  }
}