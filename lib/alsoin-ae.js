
var alsoInGalleries = document.querySelectorAll('.mapcarousel-slide');
var continentToUse = document.getElementById("Continent");
console.log("continentToUse", continentToUse);
alsoInGalleries.forEach(alsoinG) {
  console.log("alsoinG", alsoinG);
}

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
