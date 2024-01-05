
  document.querySelector('.w-condition-invisible').remove();

  document.addEventListener("DOMContentLoaded", () => {
    var portals = document.querySelectorAll(".portal-door");
    var portalUrls = document.querySelectorAll(".portal-gallery");
    var allPortals = new Array();

    //console.log("portals", portals);
    //console.log("portals.length", portals.length);

    for (portali = 0; portali < portals.length; portali++) {
      //console.log("detail", portalUrls[portali]);
      //console.log("detail html", portalUrls[portali]);

      var portalDetail = {"Alt":portals[portali].innerHTML, "Gallery":portalUrls[portali].innerHTML};
      allPortals[portali] = portalDetail;
    }
    console.log("allPortals", allPortals);
  });

/**
 * Gathering the Data and storing inside an object,
 * and pushing it into an array of objects
 */
const altData = [];
const allImages = document.querySelectorAll(".lightboximage"); // <- change here

const getImgData = (img) => {
  const imgData = {
    _src: img.src,
    _alt: img.alt,
  };
  img.removeAttribute("sizes");
  return imgData;
};
console.log("IMAGES", allImages.length);
allImages.forEach((el) => {
  altData.push(getImgData(el));
});

/**
 * Setting up Listeners to function when the Lighbox is open,
 * and to when a new child is added to the w-lightbox-container element
 */

const htmlTag = document.querySelector("html");
const lightboxes = document.querySelectorAll(".w-lightbox");

const lbOpenObserver = new MutationObserver((mut) => {
  mut.forEach((mutation) => {


    if (mutation.target.classList.contains("w-lightbox-noscroll")) {

      function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
      }
      const container = document.querySelector('.w-lightbox-strip');
      removeAllChildNodes(container);

      const lbContainer = mutation.target.querySelector(
        ".w-lightbox-container"
      );
      //const lbContent = mutation.target.querySelector(".w-lightbox-content");
      const slideChangeObserver = new MutationObserver((newMut) => {

        if (newMut[0].target.classList.contains("w-lightbox-content")) {
          const figureLB = newMut[0].target.querySelector("figure");
          const imgLB = newMut[0].target.querySelector("img");
          if (figureLB.children.length < 2) {
            altData.forEach((entry) => {
              if (entry._src == imgLB.src) {
                const customMetaStrip = document.createElement("div");
                customMetaStrip.className = "custom-alt-strip";
                let figExists = document.querySelector('figcaption');
                if (figExists == null) {
                  //console.log("no fig");
                  const figcaption = document.createElement("figcaption");
                  figcaption.classList.add("lb-figcaption");
                  if (entry._alt)  {
                    let boldedLBAlt = entry._alt.substring(entry._alt.indexOf("*") + 1, entry._alt.lastIndexOf("*"));
                    let altLBRemainder = entry._alt.substring(entry._alt.lastIndexOf("*")+1);
                    figcaption.innerHTML = boldedLBAlt.bold() + "<br/>" + altLBRemainder;
                    container.prepend(figcaption);

                    //check if PORTAL!
                    allPortals.forEach((portal) => {
                        console.log("Portal alt is", portal.Alt)
                        console.log("Alt is", figcaption)
                    });

                  } else {
                    figcaption.innerHTML = "";
                  }
                } else {
                  //console.log("fig");
                  //console.log("figExists", figExists);
                  //console.log("entry._alt", entry._alt);
                  if (entry._alt)  {
                    let boldedLBAlt = entry._alt.substring(entry._alt.indexOf("*") + 1, entry._alt.lastIndexOf("*"));
                    let altLBRemainder = entry._alt.substring(entry._alt.lastIndexOf("*")+1);
                    figExists.innerHTML = boldedLBAlt.bold() + "<br/>" + altLBRemainder;
                  } else {
                    figExists.innerHTML = "";
                  }
                }
              }
            });
          }
        }
      });
      slideChangeObserver.observe(lbContainer, {
        subtree: true,
        childList: true,
      });
    }
  });
});
lbOpenObserver.observe(htmlTag, { attributeFilter: ["class"] });

  var galleryType = document.getElementById("GalleryTemplate").innerHTML;
  console.log("Gallery Type", galleryType);


  let textBlock1 = document.getElementById("Text-Block-1").innerHTML;
  if (textBlock1 != "") {
    document.getElementById("Text-Block-Replace-1").innerHTML = textBlock1;
  } else {
    document.getElementById("0TopLeft").remove();
  }


  //First image already used - REMOVE
  var startingPoint = portals.length+1;
  console.log("startingPoint", startingPoint);
  const repeatedElement = document.getElementsByClassName('w-dyn-item')[startingPoint];
  repeatedElement.remove();

  function createTextBlock(position, style, number) {
    console.log("Create Text Block inside");

      var elementIdwithNum = "Text-Block-" + number;

      if (document.getElementById(elementIdwithNum).innerHTML != "") {
        const fourthElement = document.getElementsByClassName('w-dyn-item')[position];
        const fourthElementChild = fourthElement.querySelector('a');
        const fourthElementContent = fourthElement.innerHTML;
        var newDiv = document.createElement("div");
        //newDiv.className = "leftimg-textblock";
        newDiv.className = "div-block-19";
        fourthElement.appendChild(newDiv);
        fourthElement.replaceChild(newDiv, fourthElementChild);
        newDiv.innerHTML = fourthElementContent;
        var anotherNewDiv = document.createElement("div");
        anotherNewDiv.className = 'div-block-14';
        fourthElement.appendChild(anotherNewDiv);
        var yetAnotherNewDiv = document.createElement("div");
        yetAnotherNewDiv.className = style;
        anotherNewDiv.appendChild(yetAnotherNewDiv);
        var andYetAnotherNewDiv = document.createElement("div");
        andYetAnotherNewDiv.className = 'div-block-16';
        anotherNewDiv.appendChild(andYetAnotherNewDiv);
        var andLastAnotherNewDiv = document.createElement("div");
        andLastAnotherNewDiv.className = 'div-block-17';
        anotherNewDiv.appendChild(andLastAnotherNewDiv);
        var textBlock2 = document.createElement("div");
        textBlock2.className = 'text-block-10';
        textBlock2.id = 'Text-Block-Replace-' + number;
        andLastAnotherNewDiv.appendChild(textBlock2);
        let textBlockContent2 = document.getElementById(elementIdwithNum).innerHTML;
        document.getElementById(textBlock2.id).innerHTML = textBlockContent2;

        var photoLabelDiv = document.createElement("div");
        photoLabelDiv.className = 'photolabel';
        anotherNewDiv.appendChild(photoLabelDiv);

        var photoLabelLineDiv = document.createElement("div");
        photoLabelLineDiv.className = 'div-block-31';
        photoLabelDiv.appendChild(photoLabelLineDiv);

        var photoLabelAltDiv = document.createElement("div");
        photoLabelAltDiv.className = 'div-block-32';
        photoLabelDiv.appendChild(photoLabelAltDiv);

        var photoLabelAltContentDiv = document.createElement("div");
        photoLabelAltContentDiv.id = 'Multi-Image-' + position + '-Caption-Block';
        photoLabelAltDiv.appendChild(photoLabelAltContentDiv);

        const finalReplaceElement = document.getElementsByClassName('w-dyn-item')[position];
        const finalReplaceContent = finalReplaceElement.innerHTML;
        var finalDiv = document.createElement("div");
        finalDiv.className = "leftimageblock";
        finalReplaceElement.innerHTML = "";
        finalReplaceElement.appendChild(finalDiv);
        finalDiv.innerHTML = finalReplaceContent;
      }
  }
  //console.log("here2");
  if (galleryType == "Narrative") {


      createTextBlock(4, "linetopright", 2);
      createTextBlock(10, "linetopleft", 3);


  }

  //console.log("here2");
	let multiImageAlt = document.getElementById("Multi-Image-0").alt;
  let boldedAlt = multiImageAlt.substring(multiImageAlt.indexOf("*") + 1, multiImageAlt.lastIndexOf("*"));
	let altRemainder = multiImageAlt.substring(multiImageAlt.lastIndexOf("*")+1);
  document.getElementById("Multi-Image-0-Caption-Block").innerHTML = boldedAlt.bold() + "<br/>" + altRemainder;

	var numberofImageElements = document.querySelectorAll('.w-dyn-item').length;
  //console.log("There are", numberofImageElements);
  for (let imgi = startingPoint; imgi < numberofImageElements; imgi++) {
  	var elementToGetAltParent = document.getElementsByClassName('w-dyn-item')[imgi];
    var elementToGetAltImg = elementToGetAltParent.querySelector('img');
    var elementToGetAlt = "";
    if (elementToGetAltImg) {
      if (elementToGetAltImg.alt) {
        elementToGetAlt = elementToGetAltImg.alt;
      }
    }
    if (elementToGetAlt != "") {
    	let boldedAlt = elementToGetAlt.substring(elementToGetAlt.indexOf("*") + 1, elementToGetAlt.lastIndexOf("*"));
			let altRemainder = elementToGetAlt.substring(elementToGetAlt.lastIndexOf("*")+1);
      let tmpNum = imgi;
      var multiImageBlockName = "Multi-Image-" + tmpNum + "-Caption-Block"
  		if (document.getElementById(multiImageBlockName)) {
      	document.getElementById(multiImageBlockName).className = "captionblock div-block-20";
      	document.getElementById(multiImageBlockName).innerHTML = boldedAlt.bold() + "<br/>" + altRemainder;
     	} else {
      	var photoLabelAltContentDiv = document.createElement("div");
  			photoLabelAltContentDiv.id = multiImageBlockName;
        if ((galleryType == "Narrative") && (imgi == 1)) {
          photoLabelAltContentDiv.className = "captionblock";
        } else {
          photoLabelAltContentDiv.className = "captionblock captiontitleoverimage";
        }
  			elementToGetAltParent.appendChild(photoLabelAltContentDiv);
        photoLabelAltContentDiv.innerHTML = boldedAlt.bold() + "<br/>" + altRemainder;
      }
    }
  }

  function isImageLandscape(width, height) {
    if (width >= height) {
      return true;
    } else {
      return false;
    }
  }

  function createLine(type, id, removeCaption) {
    if (allImages.length < id) {
      return false;
    }
    let idName = "Multi-Image-" + id + "-Caption-Block";
    let rowImgLineCaption = document.getElementById(idName);
    if (type == "up") {
      if (removeCaption) {
        rowImgLineCaption.classList.remove("captiontitleoverimage");
      }
      //console.log("allImages.length", allImages.length);
      //console.log("ii", id);

      rowImgLineCaption.classList.add("upline");
      var uplinelineDiv = document.createElement("div");
      uplinelineDiv.className = "uplineline";
      rowImgLineCaption.prepend(uplinelineDiv);
    } else if (type == "down") {
      if (removeCaption) {
        rowImgLineCaption.classList.remove("captiontitleoverimage");
      }
      rowImgLineCaption.classList.add("downline");
      rowImgLineCaption.classList.add("reverse");
      var uplinelineDiv = document.createElement("div");
      uplinelineDiv.className = "downlineline";
      rowImgLineCaption.append(uplinelineDiv);
      if(rowImgLineCaption.previousElementSibling)
        rowImgLineCaption.parentNode.insertBefore(rowImgLineCaption, rowImgLineCaption.previousElementSibling);
    }
  }

  //Handle gallery layouts
 switch(galleryType) {
  case "Narrative":

  var imageSizes = [];
  imageSizes = getLoadedImages();

    // 0/1/2 is first row of 3
    if (isImageLandscape(imageSizes[0].width, imageSizes[0].height) && isImageLandscape(imageSizes[1].width, imageSizes[1].height) && isImageLandscape(imageSizes[2].width, imageSizes[2].height)) {
      console.log("All landscape");

      createLine("up", 1, false);
      createLine("up", 5, true);
      createLine("down", 7, true);
      createLine("up", 8, true);
      createLine("down", 9, true);
      createLine("down", 11, true);
      createLine("up", 12, true);
      createLine("up", 16, true);
      createLine("down", 17, true);

      createLine("up", 25, true);
      createLine("down", 27, true);
      createLine("up", 28, true);
      createLine("down", 29, true);
      createLine("down", 31, true);
      createLine("up", 32, true);
      createLine("up", 36, true);
      createLine("down", 37, true);

      createLine("up", 46, true);
      createLine("down", 47, true);
      createLine("up", 48, true);
      createLine("down", 49, true);
      createLine("down", 51, true);
      createLine("up", 52, true);
      createLine("up", 56, true);
      createLine("down", 57, true);
      createLine("down", 65, true);
      createLine("up", 66, true);
      createLine("up", 71, true);
      createLine("down", 72, true);
      createLine("up", 73, true);

      createLine("up", 75, true);
      createLine("down", 76, true);
      createLine("down", 77, true);
      createLine("down", 79, true);
      createLine("up", 80, true);
      createLine("down", 81, true);
      createLine("up", 82, true);
      createLine("up", 90, true);
      createLine("down", 92, true);
      createLine("up", 93, true);

      createLine("up", 105, true);
      createLine("down", 106, true);
      createLine("down", 107, true);
      createLine("down", 110, true);
      createLine("up", 115, true);
      createLine("down", 116, true);
      createLine("up", 117, true);
      createLine("up", 125, true);
      createLine("down", 126, true);
      createLine("up", 129, true);



    } else {
      console.log("Not all landscape");
    }

    break;
  default:
    // code block
}

	/*
	let multiImage4Alt = document.getElementById("Multi-Image-4").alt;
  let bolded4Alt = multiImage2Alt.substring(multiImage4Alt.indexOf("*") + 1, multiImage4Alt.lastIndexOf("*"));
	let alt4Remainder = multiImage2Alt.substring(multiImage4Alt.lastIndexOf("*")+1);
  document.getElementById("Multi-Image-2-Caption-Block").innerHTML = bolded4Alt.bold() + "<br/>" + alt4Remainder;
	*/



function getLoadedImages() {
  var lastImgParentElement = document.getElementsByClassName('w-dyn-item')[numberofImageElements-1];
  var lastImgElement = lastImgParentElement.querySelector('img');

  var numberofActualImageElements = numberofImageElements-1;
  console.log("numberofActualImageElements", numberofActualImageElements);
  var loadedImageSizes = [];
  var imageDimensions = {};

  for (let imgis = 1; imgis < numberofActualImageElements; imgis++) {
    //console.log("imgis", imgis);
    let imgParentElement = document.getElementsByClassName('w-dyn-item')[imgis];
    let imgElement = imgParentElement.querySelector('img');

    if (imgElement) {
      let width = imgElement.clientWidth;
      let height = imgElement.clientHeight;

      imageDimensions = {"id": imgis, "width": width, "height": height, "alt":  imgElement.alt };
      loadedImageSizes.push(imageDimensions);
    }
  }
  return loadedImageSizes;
}



