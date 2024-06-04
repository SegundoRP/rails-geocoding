import { Controller } from "@hotwired/stimulus"
import mapboxgl from 'mapbox-gl'

// Connects to data-controller="map"
export default class extends Controller {
  static values = { markers: Array, apiKey: String }

  connect() {
    mapboxgl.accessToken = this.apiKeyValue;

    this.map = new mapboxgl.Map({
      container: this.element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12' // style URL
      // center: [-74.5, 40], // starting position [lng, lat]
      // zoom: 9, // starting zoom
    });
    this.#addMarkersToMap();
  }

  #addMarkersToMap () {
    // Create a new marker.
    this.markersValue.forEach((marker) => {
      new mapboxgl.Marker()
                  .setLngLat([marker.lng, marker.lat])
                  .addTo(this.map);
    })
  }
}
