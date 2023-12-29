function onEachFeature(feature, layer) {
    layer.on('click', function () {
        var sidebarContent = document.getElementById('sidebar'); // Iniciamos la barra lateral
        var content = ''; // Iniciamos el contenido de la barra lateral como una cadena vacía

        if (feature.properties) { // Iterar sobre cada propiedad en el elemento del GeoJSON
            for (var key in feature.properties) {
                if (key === 'imageUrl') { // Verificar si el campo actual es 'imageUrl'
                    var imageUrl = feature.properties[key]; // Si hay una URL válida, mostrar la imagen
                    if (imageUrl) {
                        content += '<img src="' + imageUrl + '" alt="Imagen" style="max-width: 100%;"><br>';
                    }
                } else {
                    var value = feature.properties[key] ? feature.properties[key] : '<i>---</i>'; // Para otros campos, mostrar el valor o '---' si está vacío
                    content += '<strong>' + key + ':</strong> ' + value + '<br>';
                }
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