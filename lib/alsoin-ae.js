

var continentToUse = document.getElementById("Continent").innerHTML;
console.log("Continent:", continentToUse);

var alsoInGalleries = document.querySelectorAll('.div-block-20');
for (i = 0; i < alsoInGalleries.length; ++i) {
  var childNode = alsoInGalleries[i].childNodes;
  for (const node of childNode) {
    let nodeClasses = String(node.className);
    if (nodeClasses.includes("carouselcontinent")) {
      if (node.innerHTML != "") {
        console.log("Continent Found", node.innerHTML);
        if (node.innerHTML == continentToUse) {
          //Keep - but check if same gallery
          console.log("Check logic", node.parentElement.id);
          console.log("Check logicx2", galleryCountry);

          if (node.parentElement.id == galleryCountry) {
            node.parentElement.parentElement.parentElement.style.display = "none";
          }
        } else {
          //Remove
          //console.log("Remove This Parent", node.parentElement.parentElement.parentElement);
          node.parentElement.parentElement.parentElement.style.display = "none";
        }
      } else {
        //Remove
        node.parentElement.parentElement.parentElement.style.display = "none";
      }
    }
  }
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
