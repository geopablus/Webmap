// Definimos la herramienta de medir
L.Control.qgsmeasure().addTo(map);
// Añadir geocodificaciones al mapa
const provider = new GeoSearch.EsriProvider(); // proveedor de geocodificación ESRI
const searchControl = new GeoSearch.GeoSearchControl({
    provider: provider,
    style: 'bar',
    autoComplete: true, // Opcional: habilita la autocompletación
    autoCompleteDelay: 250, // Opcional: tiempo de retardo para la autocompletación
});
searchControl.addTo(map); // Añadir la barra de búsqueda

// Cargamos la escala
L.control.scale({
    position: 'bottomright',
    maxWidth: 150,
    metric: true,
    imperial: false,
    updateWhenIdle: true
}).addTo(map);

// Opciones de la herramienta de medir
const options = {
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


