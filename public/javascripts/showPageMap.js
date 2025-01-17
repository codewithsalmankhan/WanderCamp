mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: campgroundCoordinates, // starting position [lng, lat],
    zoom: 9, // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(campgroundCoordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML(
            '<h3><%=campground.title%></h3>'
        )
    )
    .addTo(map);

