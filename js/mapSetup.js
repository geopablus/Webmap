var map = L.map('map', {
    fullscreenControl: true,
  fullscreenControlOptions: {
    position: 'topleft'
  }
}).setView([40.376413, -3.735885], 16); // Creamos el mapa

// Definir los mapas base
var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
});
var satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles © Esri'
});
var baseMaps = {"OpenStreetMap": osmLayer,"Satellite": satelliteLayer}; // Cargamos en una variable los mapas base

// control cambio mapas base
osmLayer.addTo(map);
L.control.layers(baseMaps).addTo(map);

// Cargamos la escala
L.control.scale({
    position: 'bottomright',
    maxWidth: 150,
    metric: true,
    imperial: false,
    updateWhenIdle: true
}).addTo(map);

// Opciones de la herramienta de medir
// Default plugin options object, change wathever you want
options = {
    position: 'topleft',
    shapeOptions: {
      color: "#d07f03",
      stroke: true,
      weight: 4,
      opacity: 0.7,
    },
    icon: new L.DivIcon({
      iconSize: new L.Point(9, 9),
      className: 'leaflet-div-icon leaflet-editing-icon',
    }),
    text: {
      title: 'Measure distances', // Plugin Button Text
      segments_title: 'Segments (meters)', // Segments box title
      segments_from: "From ", // Segment start label
      segments_to: "to ", // Segment end label
      segments_total: 'Total: ', // Total distance label
      segments_meters: "m", // Meters label
    },
  };
const options = {}; // See docs to see options
L.Control.qgsmeasure(options).addTo(map);