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

                console.log(map.getStyle().layers);
                console.log("defaultLocation", defaultLocation);
                console.log(defaultLocation.place_name);
                map.setLayoutProperty("Dynamic - Inactive Country Overlay", 'visibility', 'visible');
                map.setFilter("Dynamic - Inactive Country Overlay", ["!=", "name_en", defaultLocation.place_name]);

                function toDegreesMinutesAndSeconds(coordinate) {
                    var absolute = Math.abs(coordinate);
                    var degrees = Math.floor(absolute);
                    var minutesNotTruncated = (absolute - degrees) * 60;
                    var minutes = Math.floor(minutesNotTruncated);
                    var seconds = Math.floor((minutesNotTruncated - minutes) * 60);

                    return degrees + "° " + minutes + "' " + seconds + '"';
                }

                function convertDMS(lat, lng) {
                    var latitude = toDegreesMinutesAndSeconds(lat);
                    var latitudeCardinal = lat >= 0 ? "N" : "S";

                    var longitude = toDegreesMinutesAndSeconds(lng);
                    var longitudeCardinal = lng >= 0 ? "E" : "W";

                    return latitude + " " + latitudeCardinal + "\n" + longitude + " " + longitudeCardinal;
                }

                //Add lat long to page
                console.log("defaultLocation", defaultLocation);
                document.getElementById("LATLONG").innerHTML = convertDMS(defaultLocation.geometry.coordinates[1], defaultLocation.geometry.coordinates[0]);
            });




        });
}


