let initialZoomLevel = 3.59;

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

getMapDefaultLocation(galleryCountry);

function getMapDefaultLocation(location) {
    console.log("looking up", location);
    mapboxClient.geocoding.forwardGeocode({
            query: location,
            autocomplete: false,
            limit: 1
        })
        .send()
        .then((response) => {
            if (
                !response ||
                !response.body ||
                !response.body.features ||
                !response.body.features.length
            ) {
                console.error('Invalid response:');
                console.error(response);
                return;
            }
            const defaultLocation = response.body.features[0];
            console.log("defaultLocation", defaultLocation);
            defaultLocation.center[0] = defaultLocation.center[0]-20;
            console.log("center", defaultLocation.center);
            // Initialize map and load in #map wrapper
            let map = new mapboxgl.Map({
                container: "map",
                style: "mapbox://styles/arniie/clozvpxgx016l01qyd7yb5cq8",
                center: defaultLocation.center,
                zoom: initialZoomLevel,
                zoomOffset: 0,
                dragPan: false,
                projection: "naturalEarth",
                attributionControl: false
            });

            // disable map rotation using right click + drag
            map.dragRotate.disable();
            // disable map rotation using touch rotation gesture
            map.touchZoomRotate.disableRotation();
            map.scrollZoom.disable();

            map.on("load", function(e) {

                map.setFilter("Dynamic - Active Country Fill", ["==", "name", defaultLocation.place_name]);
                map.setLayoutProperty("Dynamic - Active Country Fill", 'visibility', 'visible');

            });



        });
}


