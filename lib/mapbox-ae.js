let rangeYearFrom = "1999";
let rangeYearTo = "2023";
let initialZoomLevel = 1.7;
let europe = [15, 47];
let northamerica = [-102.616035, 38.797905];
let southamerica = [-63.057782, -12.444145];
let oceania = [139.455936, -21.249738];
let africa = [17.733646, 1.549280];
let asia = [110.735519, 15.694655];

//for each element with class of 'locations-map_population' add commas to number
let population = document.querySelectorAll(".locations-map_population");
population.forEach(function(pop) {
    let popNum = pop.innerHTML;
    let popNumCommas = popNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    pop.innerHTML = popNumCommas;
});
//-----------MAPBOX SETUP CODE BELOW-----------
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!! REPLACE ACCESS TOKEN WITH YOURS HERE !!!
mapboxgl.accessToken = "pk.eyJ1IjoiYXJuaWllIiwiYSI6ImNsbTRwM3kzcDJoaTkza3M2bnFldGlnNzAifQ.gZv56vuRDzzdnJRCLMqHPQ";
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const mapboxClient = mapboxSdk({
    accessToken: mapboxgl.accessToken
});
// create empty locations geojson object
let mapLocations = {
    type: "FeatureCollection",
    features: [],
};
let selectedMapLocations = [];
// Initialize map and load in #map wrapper
let map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/arniie/clozvpxgx016l01qyd7yb5cq8",
    center: [10, 3],
    zoom: initialZoomLevel,
    zoomOffset: 0,
    minZoom: 1.7,
    maxZoom: 3.6,
    projection: "naturalEarth",
    attributionControl: false
});
// disable map rotation using right click + drag
map.dragRotate.disable();
// disable map rotation using touch rotation gesture
map.touchZoomRotate.disableRotation();
map.scrollZoom.disable();
map.getCanvas().style.cursor = 'all-scroll';
/* Adjust zoom of map for mobile and desktop
let mq = window.matchMedia("(min-width: 480px)");
if (mq.matches) {
  map.setZoom(initialZoomLevel); //set map zoom level for desktop size
} else {
  map.setZoom(initialZoomLevel); //set map zoom level for mobile size
}*/
// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());
// Get cms items
let listLocations = document.getElementById("location-list").childNodes;

var allGalleries = [];
var allCountryNames = [];
//TODO: SORT galleries by year
listLocations.forEach(function(location) {
    let galleryYears = location.querySelector("#years").value;
    let country = location.querySelector("#country").value;
    allCountryNames.push(country);
    let galleryLocationID = location.querySelector("#locationID").value;
    let galleryImageURL = location.querySelector("#locationImageCover").value;
    let separatedYearsArray = galleryYears.split(',');
    separatedYearsArray.sort();
    allGalleries.push({
        year: separatedYearsArray[0],
        country: country,
        id: galleryLocationID,
        imageURL: galleryImageURL
    });
});
allGalleries.sort(function(a, b) {
    var keyA = a.year,
        keyB = b.year;
    // Compare the 2 years
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
});
//Set initial galleries
//console.log("ALL GALLERIES", allGalleries.length);
console.log("GALLERIES:", allGalleries.length);
console.log("allCountryNames",allCountryNames);

// For each colleciton item, grab hidden fields and convert to geojson proerty
function getGeoData() {
    //console.log("getting locations", document.getElementById("location-list").childNodes);

    listLocations.forEach(function(location) {
        //console.log("Looping List Locations, on:", location.querySelector("#country").value);
        let years = location.querySelector("#years").value;
        let fromYear = "1999";
        let toYear = "2023";
        let mapPinLocation = location.querySelector("#mapPinLocation").value;
        let mapPinLocationOverride = location.querySelector("#mapPinLocationOverride").value;
        let locationInfo = location.querySelector(".locations-map_card").innerHTML;
        let locationID = location.querySelector("#locationID").value;
        let country = location.querySelector("#country").value;
        let imageURL = location.querySelector("#locationImageCover").value;
        let separatedArray = years.split(',');
        separatedArray.sort();
        //get earliest year and latest year
        let amountofYears = Object.keys(separatedArray);
        //console.log("amountofYears", amountofYears);
        //console.log("separatedArray", separatedArray);

        fromYear = separatedArray[0];
        if (amountofYears <= 1) {
            toYear = separatedArray[0];
        } else {
            let correctKey = amountofYears.length - 1;
            toYear = separatedArray[correctKey];
        }
        //console.log("fromYear", fromYear);
        //console.log("toYear", toYear);
        let i = 0;
        let found = 0;

        while ((i < separatedArray.length) && (found == 0)) {
            //console.log("Album years", separatedArray[i]);
            //console.log("rangeYearFrom", rangeYearFrom);
            //console.log("rangeYearTo", rangeYearTo);
            if ((rangeYearFrom <= separatedArray[i]) && (rangeYearTo >= separatedArray[i])) {
                //console.log("FOUND YEAR", location);
                found++;

                if (found == 1) {
                  if (mapPinLocationOverride != "") {
                      addMapPinLocation(mapPinLocationOverride, locationID, locationInfo, years, country);
                      if (map.getSource("points")) {
                        map.getSource('points').setData(mapLocations);
                      }
                  } else {
                      addMapPinLocation(mapPinLocation, locationID, locationInfo, years, country);
                      //console.log("test", map.getSource("points"));

                      if (map.getSource("points")) {
                        map.getSource('points').setData(mapLocations);
                      }
                  }
                }
            }
            i++;
        }
    });
}

function removeGalleriesFromSlider(rangeYearFrom, rangeYearTo) {
    console.log("Attempt to remove");
    var removeGalleryCount = 0;
    mapLocations.features.forEach((location) => {

        let separatedgalleryYearsArray = location.properties.years.split(',');
        separatedgalleryYearsArray.sort();
        let amountofGalleryYears = Object.keys(separatedgalleryYearsArray);

        if (amountofGalleryYears <= 1) {
            toGalleryYear = separatedgalleryYearsArray[0];
        } else {
            let correctGalleryKey = amountofGalleryYears.length - 1;
            toGalleryYear = separatedgalleryYearsArray[correctGalleryKey];
        }
        let maxYearItem = separatedgalleryYearsArray.length;
        let actualMaxYearItem = maxYearItem-1;

        //console.log("--------");
        //console.log("Album", location.properties.id);

        function isBetween(x, min, max) {
            return x >= min && x <= max;
        }
        //console.log("check earliest", isBetween(separatedgalleryYearsArray[0], rangeYearFrom, rangeYearTo));
        //console.log("check oldest", isBetween(separatedgalleryYearsArray[actualMaxYearItem], rangeYearFrom, rangeYearTo));

        if ((isBetween(separatedgalleryYearsArray[0], rangeYearFrom, rangeYearTo)) || (isBetween(separatedgalleryYearsArray[actualMaxYearItem], rangeYearFrom, rangeYearTo))) {
            //console.log("We need to re-add", location.properties.country);
            const child = document.getElementById(location.properties.country);
            if (child) {
                child.parentElement.style.display = "block";
            }
        } else {
            removeGalleryCount++;
            //console.log("We need to remove", location.properties.country);
            const child = document.getElementById(location.properties.country);
            if (child) {
                child.parentElement.style.display = "none";
            }
        }

        //console.log("--------");
    });
}
// Invoke function
getGeoData();

function addMapPinLocation(location, lid, lif, locationyears, locationcountry) {
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
            const feature = response.body.features[0];
            let geoData = {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: feature.center,
                },
                properties: {
                    id: lid,
                    description: lif,
                    years: locationyears,
                    country: locationcountry
                },
            };

            if (mapLocations.features.includes(geoData) === false) {
                mapLocations.features.push(geoData);
            }
        });
}

// Define mapping function to be invoked later
function addMapPoints(initial = false) {

    if (!initial) {
      map.removeImage('inactive-marker');
    }

    console.log("Map locations are", mapLocations);

    // Add an image to use as a custom marker
    map.loadImage(
        'https://uploads-ssl.webflow.com/64f5a60c9d914de177e256f6/6554d44a6209d11d97df6b5b_AEpin.png',
        (error, image) => {
            if (error) throw error;
            map.addImage('inactive-marker', image);
            map.addSource('points', {
                'type': 'geojson',
                'data': mapLocations
            });
            // Add a symbol layer
            map.addLayer({
                'id': 'marker-points',
                'type': 'symbol',
                'source': 'points',
                'layout': {
                    'icon-image': 'inactive-marker',
                }
            });
        }
    );

    map.on("mouseenter", "points", (e) => {
        let points = map.queryRenderedFeatures(e.point, {
            layers: ['marker-points']
        })
    });
    //console.log("map.getStyle().layers", map.getStyle().layers);
    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    map.on("click", "marker-points", (e) => {
        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        /*
        new mapboxgl.Popup({
            className: "activePopUp"
        }).setLngLat(coordinates).setHTML(description).addTo(map);
        const poppedupLatLong = document.getElementsByClassName("activePopUp");*/

        let urlCountry = e.features[0].properties.name;

        if(urlCountry == "United Kingdom") {
            urlCountry = "uk";
        }
        if(urlCountry == "United States") {
            urlCountry = "usa";
        }
        window.location.href = window.location.protocol + "//" + window.location.host + '/galleries/' + urlCountry.toLowerCase();

        /*
        coordsSplit = String(coordinates).split(",");
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

        document.querySelector('.activePopUp .poppedup-latlong').append(convertDMS(coordsSplit[1], coordsSplit[0]));
        */
    });
    // Center the map on the coordinates of any clicked circle from the 'points' layer.
    map.on("click", "marker-points", (e) => {
        map.flyTo({
            center: e.features[0].geometry.coordinates,
            speed: 2,
            curve: 1,
            easing(t) {
                return t;
            },
        });
    });
    // Change the cursor to a pointer when the mouse is over the 'locations' layer.
    map.on("mouseenter", "points", () => {
        map.getCanvas().style.cursor = "crosshair";
    });
    // Change it back to a pointer when it leaves.
    map.on("mouseleave", "points", () => {
        map.getCanvas().style.cursor = "all-scroll";
    });

    map.on('click', (e) => {
      //console.log("clicked on...", e);

      var features = map.queryRenderedFeatures(e.point, {
        layers: ["cf"]
      });
      var currentZoom = map.getZoom();
      const continentDetails = map.queryRenderedFeatures(e.point);
      const displayProperties = ['properties'];
      const displayFeatures = features.map((feat) => {
        const displayFeat = {};
        displayProperties.forEach((prop) => {
            displayFeat[prop] = feat[prop];
            //console.log("feat[prop]", map.queryRenderedFeatures(e.point));
        });
        var clickedContinent = displayFeat.properties.continent;
        var regionVariableName = clickedContinent.toLowerCase().replace(/[^a-z]/g, "");
        console.log("clickedContinent", regionVariableName);
        console.log("clickedContinent2", eval(regionVariableName));
        map.flyTo({
          center: eval(regionVariableName),
          essential: true,
          zoom: 2.6
          });
      });
    });
}

//When map is loaded initialize with data
map.on("load", function(e) {

      const input = document.querySelector("input");
      input.addEventListener("input", function(event) {

        rangeYearFrom = document.getElementById("yearFrom").innerHTML;
        rangeYearTo = document.getElementById("yearTo").innerHTML;
        //console.log("From Slider moved");
        //console.log("Range Year", rangeYearFrom);
        //console.log("Range Year To", rangeYearTo);

        map.setFilter('marker-points', ["any", ["all", ['>=', ['get', 'years'], rangeYearFrom], ['<=', ['get', 'years'], rangeYearTo]]]);
        removeGalleriesFromSlider(rangeYearFrom, rangeYearTo);
        //console.log("Map Locations", mapLocations);
        //getGeoData();
        //addMapPoints();
    });

    const input2 = document.getElementById("To-3");
    input2.addEventListener("input", function(event) {

        rangeYearFrom = document.getElementById("yearFrom").innerHTML;
        rangeYearTo = document.getElementById("yearTo").innerHTML;

        //getGeoData();
        map.setFilter('marker-points', ["any", ["all", ['>=', ['get', 'years'], rangeYearFrom], ['<=', ['get', 'years'], rangeYearTo]]]);
        removeGalleriesFromSlider(rangeYearFrom, rangeYearTo);
        //addMapPoints();
    });

    addMapPoints(true);
    map.addSource('cbs', { // country-boundaries-simplified
        'type': 'geojson',
        'data': 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson'
    });
    map.addLayer({
        "id": "cf", // country-fills
        "type": "fill",
        "source": "cbs",
        "layout": {},
        "paint": {
            "fill-color": "#fff",
            "fill-opacity": 0
        }
    });
    map.addLayer({
        "id": "cb", // country borders
        "type": "line",
        "source": "cbs",
        "layout": {},
        "paint": {
            "line-color": "#535353",
            "line-width": 1
        }
    });
    map.addLayer({
        "id": "cfh", // country-fills-hover",
        "type": "fill",
        "source": "cbs",
        "layout": {},
        "paint": {
            "fill-color": "white",
            "fill-opacity": .5,
            'fill-opacity-transition': { duration: 1000 }
        },
        "filter": ["==", "name", ""]
    });

    map.on("click", "cfh", (e) => {
        /*console.log("Country clicked", e);
        console.log("Country features coords", e.lngLat);
        console.log("Country features desc", e.features[0].properties.name_long);*/
        console.log("Country clicked", e);

        const coordinates = e.lngLat;
        const description = e.features[0].properties.name_long;

        //find gallery from country name
        var foundCountryClick = "";
        mapLocations.features.forEach((mpLoc) => {
            if (mpLoc.properties.country == description) {
                foundCountryClick = mpLoc.properties.description;
            }
        });

        /*new mapboxgl.Popup({
            className: "activePopUp"
        }).setLngLat(coordinates).setHTML(foundCountryClick).addTo(map);
        const poppedupLatLong = document.getElementsByClassName("activePopUp");*/

        console.log("e.features[0]", e.features[0]);

        let urlCountry = "";

        if (e.features[0].properties.name) {
            urlCountry = e.features[0].properties.name;
        }

        if(urlCountry == "United Kingdom") {
            urlCountry = "uk";
        }
        if(urlCountry == "United States") {
            urlCountry = "usa";
        }
        window.location.href = window.location.protocol + "//" + window.location.host + '/galleries/' + urlCountry.toLowerCase();
    });

    document.querySelector('.mapboxgl-ctrl-zoom-out').addEventListener('mousedown', () =>{
        console.log("Minus clicked");
        map.flyTo({
            center: [10,3],
            zoom: initialZoomLevel,
            zoomOffset: 0,
        })
    });

    // When the user moves their mouse over the page, we look for features
    // at the mouse position (e.point) and within the states layer (states-fill).
    // If a feature is found, then we'll update the filter in the state-fills-hover
    // layer to only show that state, thus making a hover effect.
    map.on("mousemove", function(e) {
        //console.log("Zoom is", map.getZoom());
        if (map.getZoom() < 1.8) {
            map.flyTo({
                center: [10,3],
                zoom: initialZoomLevel,
                zoomOffset: 0
            })
        }
        var features = map.queryRenderedFeatures(e.point, {
            layers: ["cf"]
        });
        var currentZoom = map.getZoom();
        const continentDetails = map.queryRenderedFeatures(e.point);
        //console.log("HoverDetails", continentDetails);
        const displayProperties = ['properties']
        const displayFeatures = features.map((feat) => {
            const displayFeat = {};
            displayProperties.forEach((prop) => {
                displayFeat[prop] = feat[prop];
                //console.log("feat[prop]", map.queryRenderedFeatures(e.point));
            });
            var activeContinent = displayFeat.properties.continent;
            var subRegion = "";
            //console.log("activeContinent", activeContinent);
            if (activeContinent == "North America") {
                activeContinent = "Americas";
                subRegion = "Northern America";
            }
            if (activeContinent == "South America") {
                activeContinent = "Americas";
                subRegion = "Latin America and the Caribbean";
            }
            //console.log("replaced continent", activeContinent);
            if (activeContinent != "") {
                //var filter_map = map.getFilter("Dynamic - Inactive Country Overlay");
                //console.log("current filter", JSON.stringify(filter_map));

                if (subRegion != "") {
                    var new_Filter = ["match", ["get", "subregion"],
                        [subRegion], false, true
                    ];
                    map.setFilter("Dynamic - Inactive Country Overlay", new_Filter);
                } else {
                    var new_Filter = ["match", ["get", "region"],
                        [activeContinent], false, true
                    ];
                    map.setFilter("Dynamic - Inactive Country Overlay", new_Filter);
                }
            }
            if (activeContinent != "") {
                //map.setPaintProperty('Dynamic - Inactive Country Overlay', 'fill-opacity-transition', {duration: 2000, delay: 100});
                //console.log("map.getStyle().layers", map.getStyle().layers);
                //map.setLayoutProperty("Dynamic - Inactive Country Overlay", 'visibility', 'visible');
                //map.setPaintProperty('Dynamic - Inactive Country Overlay', 'fill-opacity-transition', {duration: 0, delay: 0});
                setTimeout(function(){
                    map.setLayoutProperty("Dynamic - Inactive Country Overlay", 'visibility', 'visible');
                    map.setPaintProperty('Dynamic - Inactive Country Overlay', 'fill-opacity-transition', {duration: 5000, delay: 1000});
                }, 300)
            } else {
                map.setLayoutProperty("Dynamic - Inactive Country Overlay", 'visibility', 'none');
            }
        });
        //force layer to be removed when no continent hovered
        //console.log("cd", continentDetails[0]);

        if(typeof continentDetails[0] !== "undefined") {
            if (continentDetails[0].sourceLayer) {
                if (continentDetails[0].sourceLayer == "water") {
                    //map.setLayoutProperty("Dynamic - Inactive Country Overlay", 'visibility', 'none');
                }
            }
        }
        if (currentZoom > initialZoomLevel) {
            if (features.length) {
                //console.log("fpn",  features[0].properties.name);
                var foundHover = false;
                const iterator = allCountryNames.values();
                for (const value of iterator) {

                    //console.log("now check years", value);
                    //console.log("nrangeYearFrom", rangeYearFrom);
                    //console.log("nrangeYearTo", rangeYearTo);

                    if (value == features[0].properties.name) {
                        //console.log("found", value + features[0].properties.name);
                        foundHover = true;
                    }
                }
                //console.log("foundHover", foundHover);

                if (foundHover) {
                    map.getCanvas().style.cursor = 'crosshair';
                    map.setFilter("cfh", ["==", "name", features[0].properties.name]);
                } else {
                    map.setFilter("cfh", ["==", "name", ""]);
                    map.getCanvas().style.cursor = 'all-scroll';
                }
            } else {
                map.setFilter("cfh", ["==", "name", ""]);
                map.getCanvas().style.cursor = 'all-scroll';
            }
        }
    });
    // Reset the state-fills-hover layer's filter when the mouse leaves the map
    map.on("mouseout", function() {
        map.getCanvas().style.cursor = 'all-scroll';
        map.setFilter("cfh", ["==", "name", ""]);
    });
    map.on("click", function(e) {
        var features = map.queryRenderedFeatures(e.point, {
            layers: ["cf"]
        });
        /*if (features.length) {
            console.log("here", features[0].properties.name + e.point);
        }*/
    });
});
