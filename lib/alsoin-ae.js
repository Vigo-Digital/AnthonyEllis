
var alsoInGalleries = document.querySelectorAll('.mapcarousel-slide');
console.log("alsoInGalleries", alsoInGalleries);
console.log("alsoInGalleries", alsoInGalleries.id);

mapboxClient.geocoding.forwardGeocode({
  query: "Botswana",
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
  console.log(response.body);
});

function removeGalleriesFromSlider(continent) {
  console.log("Also in Locations", mapLocations);
  var removeGalleryCount = 0;

  /*
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


      if ((rangeYearFrom > separatedgalleryYearsArray[0]) && (rangeYearTo > toGalleryYear)) {
          removeGalleryCount++;
          console.log("We need to remove", location.properties.country);
          const child = document.getElementById(location.properties.country);
          if (child) {
              child.parentElement.style.display = "none";
          }
      } else {
          console.log("We need to re-add", location.properties.country);
          const child = document.getElementById(location.properties.country);
          if (child) {
              child.parentElement.style.display = "block";
          }
      }

  });*/
}
