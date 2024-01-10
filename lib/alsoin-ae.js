

var continentToUse = document.getElementById("Continent").innerHTML;
console.log("Continent:", continentToUse);

document.addEventListener('DOMContentLoaded', ()=> {
  if (document.getElementById("AlsoInUpdate")) {
    const updateAlsoinTitle = document.getElementById("AlsoInUpdate");
    if (updateAlsoinTitle) {
      updateAlsoinTitle.innerHTML = "Also in " + continentToUse;
    }
  }
  let overrideAlsoIn = false;
  if (document.getElementById("OverrideAlsoIn")) {
    overrideAlsoIn = true;
  }



//Default behaviour, look in continent
var alsoInGalleries = document.querySelectorAll('.div-block-20');
for (i = 0; i < alsoInGalleries.length; ++i) {
  var childNode = alsoInGalleries[i].childNodes;
  for (const node of childNode) {
    let nodeClasses = String(node.className);
    if (!overrideAlsoIn) {
      if (nodeClasses.includes("carouselcontinent")) {
        if (node.innerHTML != "") {
          //console.log("Continent Found", node.innerHTML);
          if (node.innerHTML == continentToUse) {
            //Keep - but check if same gallery
            //console.log("Check logic", node.previousSibling.innerHTML);
            //console.log("Check logicx2", galleryCountry);

            if (node.previousSibling.innerHTML== galleryCountry) {
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
    } else {
      var relatedGalleryItems = document.querySelectorAll('.relatedgalleryitem');
      var relatedGalleryItemsArray = [];
      var relatedGalleryItemsArrayCount = 0;
      /*for (i = 0; i < relatedGalleryItems.length; i++) {
        relatedGalleryItemsArray[relatedGalleryItemsArrayCount] = relatedGalleryItems[i].innerHTML;
        relatedGalleryItemsArrayCount++;
      }*/
      console.log("relatedGalleryItemsArray", relatedGalleryItemsArray);
      if (nodeClasses.includes("locationoverimage")) {
        if (node.innerHTML != "") {
          if (relatedGalleryItemsArray.includes(node.innerHTML)) {
            console.log("Keep:", node.innerHTML)
          } else {
            node.parentElement.parentElement.parentElement.style.display = "none";
          }
        } else {
          node.parentElement.parentElement.parentElement.style.display = "none";
        }
      }
    }
  }
}
});
