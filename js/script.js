var map = L.map('map').setView([40.376413, -3.735885], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19,attribution: '© OpenStreetMap contributors'}).addTo(map);

function onEachFeature(feature, layer) {
    layer.on('click', function () {
        var sidebarContent = document.getElementById('sidebar'); // Iniciamos la barra lateral
        var content = ''; // Iniciamos el contenido de la barra lateral como una cadena vacía
        if (feature.properties) { // Iterar sobre cada propiedad en el elemento del GeoJSON
            for (var key in feature.properties) {
                content += '<strong>' + key + ':</strong> ' + feature.properties[key] + '<br>'; // Agregar el nombre del campo y su valor al contenido
            }
        }
        sidebarContent.innerHTML = content; // Actualizar la barra lateral con el nuevo contenido
    });
}

// Ruta al archivo GeoJSON
var geojsonURL = 'layers/New_csv_puntos.geojson';

// Cargar y añadir el GeoJSON al mapa
fetch(geojsonURL)
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            onEachFeature: onEachFeature
        }).addTo(map);
    })
    .catch(error => console.log('Error al cargar el GeoJSON:', error));
