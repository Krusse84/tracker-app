import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MapLoaderService {
  private isLoaded = false;

  load(): Promise<void> {

    debugger
    if (this.isLoaded) return Promise.resolve();

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      const params = new URLSearchParams({
        key: 'AIzaSyBuT4j-ZqP24fYuefyVYwoRvA3gdxE3edI', // set to '' if API key not available yet
        v: 'beta',
        libraries: 'marker',
        callback: 'initMap'
      });

      script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
      script.async = true;
      script.defer = true;

      (window as any).initMap = () => resolve(undefined);

      script.onerror = () => reject(new Error('Failed to load Google Maps'));
      document.head.appendChild(script);
    }).then(() => {
      this.isLoaded = true;
    });
  }
}