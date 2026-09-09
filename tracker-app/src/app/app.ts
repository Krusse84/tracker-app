import { Component, OnInit, inject, signal } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { MapLoaderService } from './services/map-loader-service.service';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [GoogleMapsModule, CommonModule],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App implements OnInit {

  // This flag prevents Angular from rendering the <google-map>
  // before the Google Maps JS API is fully loaded.
  // Without this, you'll get "google is not defined" or blank maps.
  isMapLoaded = false;

  private mapLoaderService = inject(MapLoaderService);
  protected readonly title = signal('tracker-app');

  // Initial map settings
  mapOptions = {
    center: { lat: 19.098272, lng: 72.874928 },
    zoom: 13
  };

  ngOnInit(): void {

    // Load the Google Maps script first.
    // Then allow the map to render.
    this.mapLoaderService.load()
      .then(() => {
        this.isMapLoaded = true; // Map can now safely render
        console.log('Google Maps loaded successfully');
      })
      .catch(err => {
        console.error('Failed to load Google Maps:', err);
      });
  }
}

  


