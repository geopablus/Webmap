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