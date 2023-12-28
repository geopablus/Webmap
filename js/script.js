var map = L.map('map').setView([40.376413, -3.735885], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19,attribution: '© OpenStreetMap contributors'}).addTo(map);

function onEachFeature(feature, layer) {
    layer.on('click', function () {
        // Asumiendo que tienes un div con un ID específico para la barra lateral
        var sidebarContent = document.getElementById('sidebar');

        // Construir el contenido de la barra lateral basado en las propiedades del GeoJSON
        var content = '';
        if (feature.properties) {
            // Aquí puedes personalizar el contenido basado en las propiedades del GeoJSON
            content += '<h3>' + feature.properties.Vector + '</h3>'; 
            content += '<h3>' + feature.properties.Fecha + '</h3>'; 
            content += '<h3>' + feature.properties.Mes + '</h3>'; 
            content += '<h3>' + feature.properties.RepeInt + '</h3>'; 
            content += '<h3>' + feature.properties.Madrigueras + '</h3>';  
        }

        // Actualizar la barra lateral con el nuevo contenido
        sidebarContent.innerHTML = content;
    });
}

// Ruta al archivo GeoJSON
var geojsonURL = 'https://www.dropbox.com/scl/fi/z580hs82g6awtk9dihnuy/New_csv_puntos.geojson?rlkey=z4hbcs5d8tr9z3thwkkguhrqi&dl=0';

// Cargar y añadir el GeoJSON al mapa
fetch(geojsonURL)
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            onEachFeature: onEachFeature
        }).addTo(map);
    })
    .catch(error => console.log('Error al cargar el GeoJSON:', error));
