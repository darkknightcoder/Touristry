mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: spot.geometry.coordinates,
    zoom: 10
});

// map.addControl(new mapboxgl.NavigationControl());

// new mapboxgl.Marker()
//     .setLngLat(spot.geometry.coordinates)
//     .setPopup(
//         new mapboxgl.Popup({ offset: 25 })
//             .setHTML(`<h3>${spot.name}</h3><p>${spot.location}</p>`
//         )
//     )
//     .addTo(map)