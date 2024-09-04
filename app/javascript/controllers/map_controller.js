import { Controller } from "@hotwired/stimulus"
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"

// Connects to data-controller="map"
export default class extends Controller {
  static values = { markers: Array, apiKey: String }

  connect() {
    mapboxgl.accessToken = this.apiKeyValue;
    // mapboxgl.accessToken = window.ENV.MAPBOX_API_KEY;
    // mapboxgl.accessToken = document.querySelector("meta[name='mapbox_key']").content;

    this.map = new mapboxgl.Map({
      container: this.element, // container ID
      // here in style i can put my proxy defined in routes
      style: 'mapbox://styles/segundorebaza/clx2q37p202d301qp6vbu2cx8' // style URL
      // center: [-74.5, 40], // starting position [lng, lat]
      // zoom: 9, // starting zoom
    });
    this.#addMarkersToMap();
    this.#fitMapToMarkers();
    this.map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken,
                                             mapboxgl: mapboxgl }));
  }

  #addMarkersToMap () {
    // Create a new marker.
    this.markersValue.forEach((marker) => {
      const popup = new mapboxgl.Popup().setHTML(marker.info_window_html)

      const customMarker = document.createElement('div');
      customMarker.innerHTML = marker.marker_html;

      new mapboxgl.Marker(customMarker)
                  .setLngLat([marker.lng, marker.lat])
                  .setPopup(popup)
                  .addTo(this.map);
    })
  }

  #fitMapToMarkers() {
    const bounds = new mapboxgl.LngLatBounds();
    this.markersValue.forEach((marker) => {
      bounds.extend([marker.lng, marker.lat]);
    });
    this.map.fitBounds(bounds, {padding: 70, maxZoom: 15, duration: 0});
  }
}
