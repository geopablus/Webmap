var map = L.map('map').setView([40.376413, -3.735885], 16); // Creamos el mapa
var rataIcon = L.icon({
    iconUrl: 'images/rata.png',
    iconSize: [38, 38], // Tamaño del icono, ajusta según sea necesario
    iconAnchor: [22, 94], // Punto del icono que corresponde a la ubicación del marcador
    popupAnchor: [-3, -76] // Punto desde el cual se abrirá el popup
});

var cucasIcon = L.icon({
    iconUrl: 'images/cuca.png',
    iconSize: [38, 38], // Tamaño del icono
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
});

// Cargamos el mapa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19,attribution: '© OpenStreetMap contributors'}).addTo(map);

function onEachFeature(feature, layer) {
    layer.on('click', function () {
        var sidebarContent = document.getElementById('sidebar'); // Iniciamos la barra lateral
        var content = ''; // Iniciamos el contenido de la barra lateral como una cadena vacía
        if (feature.properties) { // Iterar sobre cada propiedad en el elemento del GeoJSON
            for (var key in feature.properties) {
                var value = feature.properties[key] ? feature.properties[key] : '<i>---</i>'; // Verificar si hay valor y usar '---' en cursiva si no hay
                content += '<strong>' + key + ':</strong> ' + value + '<br>'; // Agregar el nombre del campo y su valor al contenido
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
            pointToLayer: function (feature, latlng) {
                var icon = feature.properties.Vector === 'RATAS' ? rataIcon : cucasIcon; // Escoge el icono basado en la propiedad 'Vector'
                return L.marker(latlng, { icon: icon });
            },
            onEachFeature: onEachFeature
        }).addTo(map);
    })
    .catch(error => console.log('Error al cargar el GeoJSON:', error));



    