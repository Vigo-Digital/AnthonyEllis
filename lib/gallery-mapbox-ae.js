

let galleryCountry = document.getElementById("galleryCountry").innerHTML;
console.log("Country:", galleryCountry);

let initialZoomLevel = 3.59;

if (galleryCountry == "Saint Lucia" || galleryCountry == "Lebanon") {
    initialZoomLevel = 6.59;
}
if (galleryCountry == "Cyprus") {
    initialZoomLevel = 4.59;
}
if (galleryCountry == "Singapore") {
    initialZoomLevel = 5;
}
if (galleryCountry == "Vatican") {
    initialZoomLevel = 12.59;
}

console.log("initialZoomLevel", initialZoomLevel)
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
// !!!
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

            let adjustedCenter = [];
            if (galleryCountry == "Saint Lucia" || galleryCountry == "Lebanon" || galleryCountry == "Vatican" || galleryCountry == "Cyprus") {
                adjustedCenter[0] = defaultLocation.center[0]-1;
            } else if (galleryCountry == "Singapore") {
                adjustedCenter[0] = defaultLocation.center[0]-10;
            } else {
                adjustedCenter[0] = defaultLocation.center[0]-20;
            }
            adjustedCenter[1] = defaultLocation.center[1];

            //defaultLocation.center[0] = defaultLocation.center[0]-20;
            //console.log("center", defaultLocation.center);
            // Initialize map and load in #map wrapper
            var mapContainer = "map";

            let map = new mapboxgl.Map({
                container: mapContainer,
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
            if (document.getElementById("galleryNextJourneyCountry") != null) {
                //console.log("galleryNextJourneyCountry", galleryNextJourneyCountry.innerHTML);
                mapboxClient.geocoding.forwardGeocode({
                    query: galleryNextJourneyCountry.innerHTML,
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
                    adjustedMPCenter[1] = Math.abs(midpoint[1]);

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

                        let mapLocations = {
                            type: "FeatureCollection",
                            features: [],
                        };

                        let geoDataOrigin = {
                            id: "origin",
                            type: "Feature",
                            geometry: {
                                type: "Point",
                                coordinates: origin
                            }
                        };

                        let geoDataDestintion = {
                            id: "origin",
                            type: "Feature",
                            geometry: {
                                type: "Point",
                                coordinates: destination
                            }
                        }

                        mapLocations.features.push(geoDataOrigin);
                        mapLocations.features.push(geoDataDestintion);

                        // Add an image to use as a custom marker
                        mapnj.loadImage(
                            'https://uploads-ssl.webflow.com/64f5a60c9d914de177e256f6/6554d44a6209d11d97df6b5b_AEpin.png',
                            (error, image) => {
                                if (error) throw error;
                                mapnj.addImage('inactive-marker', image);
                                mapnj.addSource('points', {
                                    'type': 'geojson',
                                    'data': mapLocations
                                });
                                // Add a symbol layer
                                mapnj.addLayer({
                                    'id': 'marker-points',
                                    'type': 'symbol',
                                    'source': 'points',
                                    'layout': {
                                        'icon-image': 'inactive-marker',
                                    }
                                });
                            }
                        );



                    });
                });
            }
        });
}


