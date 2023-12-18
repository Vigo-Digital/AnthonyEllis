let initialZoomLevel = 1.7;

let galleryCountry = document.getElementById("galleryCountry").innerHTML;
console.log("Country", galleryCountry);

//-----------MAPBOX SETUP CODE BELOW-----------
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!! REPLACE ACCESS TOKEN WITH YOURS HERE !!!
mapboxgl.accessToken = "pk.eyJ1IjoiYXJuaWllIiwiYSI6ImNsbTRwM3kzcDJoaTkza3M2bnFldGlnNzAifQ.gZv56vuRDzzdnJRCLMqHPQ";
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const mapboxClient = mapboxSdk({
    accessToken: mapboxgl.accessToken
});
// create empty locations geojson object
let mapLocations = {
    type: "FeatureCollection",
    features: [],
};
// Initialize map and load in #map wrapper
let map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/arniie/clozvpxgx016l01qyd7yb5cq8",
    center: [-9, 5],
    zoom: initialZoomLevel,
    zoomOffset: 0,
    projection: "naturalEarth",
    attributionControl: false
});
// disable map rotation using right click + drag
map.dragRotate.disable();
// disable map rotation using touch rotation gesture
map.touchZoomRotate.disableRotation();
map.scrollZoom.disable();


