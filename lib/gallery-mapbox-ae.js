let initialZoomLevel = 3.59;

let galleryCountry = document.getElementById("galleryCountry").innerHTML;
if (document.getElementById("galleryNextJourneyCountry") != null) {
    let galleryNextJourneyCountry = document.getElementById("galleryNextJourneyCountry").innerHTML;
    if (galleryNextJourneyCountry == "") {
        galleryNextJourneyCountry = false;
    }
} else {
    let galleryNextJourneyCountry = false;
}

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
    //console.log("looking up", location);
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

            let adjustedCenter = [];
            adjustedCenter[0] = defaultLocation.center[0]-20;
            adjustedCenter[1] = defaultLocation.center[1];

            //defaultLocation.center[0] = defaultLocation.center[0]-20;
            //console.log("center", defaultLocation.center);
            // Initialize map and load in #map wrapper
            let map = new mapboxgl.Map({
                container: "map",
                style: "mapbox://styles/arniie/clozvpxgx016l01qyd7yb5cq8",
                center: adjustedCenter,
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

                //console.log(map.getStyle().layers);
                //console.log(defaultLocation.place_name);
                map.setLayoutProperty("Dynamic - Inactive Country Overlay", 'visibility', 'visible');
                map.setFilter("Dynamic - Inactive Country Overlay", ["!=", "name_en", defaultLocation.place_name]);

                function toDegreesMinutesAndSeconds(coordinate) {
                    var absolute = Math.abs(coordinate);
                    var degrees = Math.floor(absolute);
                    var minutesNotTruncated = (absolute - degrees) * 60;
                    var minutes = Math.floor(minutesNotTruncated);
                    var seconds = Math.floor((minutesNotTruncated - minutes) * 60);

                    return degrees + "°" + minutes + "'" + seconds + '"';
                }

                function convertDMS(lat, lng) {
                    var latitude = toDegreesMinutesAndSeconds(lat);
                    var latitudeCardinal = lat >= 0 ? "N" : "S";

                    var longitude = toDegreesMinutesAndSeconds(lng);
                    var longitudeCardinal = lng >= 0 ? "E" : "W";

                    return latitude + "" + latitudeCardinal + "\n" + longitude + "" + longitudeCardinal;
                }

                //Add lat long to page
                //console.log("defaultLocation", defaultLocation);
                document.getElementById("LATLONG").innerHTML = convertDMS(defaultLocation.geometry.coordinates[1], defaultLocation.geometry.coordinates[0]);
            });
            if (galleryNextJourneyCountry) {
                console.log("galleryNextJourneyCountry", galleryNextJourneyCountry);
                mapboxClient.geocoding.forwardGeocode({
                    query: galleryNextJourneyCountry,
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
                    const pathToLocation = response.body.features[0];

                    let nextJourneyZoomLevel = 1.6;

                    const origin = defaultLocation.center;
                    const destination = pathToLocation.center;

                    var midpoint = [];
                    midpoint[0] = Math.abs(defaultLocation.center[0])-Math.abs(pathToLocation.center[0]);
                    midpoint[1] = Math.abs(defaultLocation.center[1])-Math.abs(pathToLocation.center[1]);
                    //console.log("midpoint", midpoint);

                    let adjustedMPCenter = [];
                    adjustedMPCenter[0] = midpoint[0]+30;
                    adjustedMPCenter[1] = midpoint[1];

                    let mapnj = new mapboxgl.Map({
                        container: "mapnj",
                        style: "mapbox://styles/arniie/clozvpxgx016l01qyd7yb5cq8",
                        center: adjustedMPCenter,
                        zoom: nextJourneyZoomLevel,
                        dragPan: false,
                        projection: "equirectangular",
                        attributionControl: false
                    });

                    // disable map rotation using right click + drag
                    mapnj.dragRotate.disable();
                    // disable map rotation using touch rotation gesture
                    mapnj.touchZoomRotate.disableRotation();
                    mapnj.scrollZoom.disable();

                    const distance = turf.distance(origin, destination, { units: 'miles' });
                    const flightMidpoint = turf.midpoint(origin, destination);
                    const bearing = turf.bearing(origin, destination);
                    const leftSideArc = bearing + 90 > 180 ? -180 + (bearing + 90 - 180) : bearing + 90;
                    const mpDestination = turf.destination(flightMidpoint, distance / 5, leftSideArc, { units: 'miles' });
                    const curvedLine = turf.bezierSpline(
                    turf.lineString([origin, mpDestination.geometry.coordinates, destination]),
                    );

                    // A simple line from origin to destination.
                    const route = {
                    'type': 'FeatureCollection',
                    'features':
                    [
                        {
                            'type': 'Feature',
                            'geometry':
                            {
                                'type': 'LineString',
                                'coordinates': [origin, destination]
                            }
                        }
                    ]
                    };

                    mapnj.on("load", function(e) {
                        //console.log(mapnj.getStyle().layers);
                        //console.log("defaultLocation", defaultLocation);
                        //console.log("pathToLocation", pathToLocation);
                        //console.log("nj", defaultLocation.place_name);

                        mapnj.setLayoutProperty("Dynamic - Inactive Country Overlay", 'visibility', 'visible');
                        mapnj.setFilter("Dynamic - Inactive Country Overlay", ["all",
                            ["!=", "name_en", defaultLocation.place_name],
                            ["!=", "name_en", pathToLocation.place_name]
                        ]);

                        mapnj.addSource('route', {
                            'type': 'geojson',
                            'data': curvedLine
                        });

                        mapnj.addLayer({
                            'id': 'route',
                            'source': 'route',
                            'type': 'line',
                            'paint': {
                            'line-width': 1,
                            'line-color': '#FFF'
                            }
                        });



                    });
                });
            }
        });
}


