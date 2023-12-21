
  document.querySelector('.w-condition-invisible').remove();

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
  return imgData;
};

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
                  console.log("no fig");
                  const figcaption = document.createElement("figcaption");
                  figcaption.classList.add("lb-figcaption");
                  if (entry._alt)  {
                    let boldedLBAlt = entry._alt.substring(entry._alt.indexOf("*") + 1, entry._alt.lastIndexOf("*"));
                    let altLBRemainder = entry._alt.substring(entry._alt.lastIndexOf("*")+1);
                    figcaption.innerHTML = boldedLBAlt.bold() + "<br/>" + altLBRemainder;
                    container.prepend(figcaption);
                  } else {
                    figcaption.innerHTML = "";
                  }
                } else {
                  console.log("fig");
                  console.log("figExists", figExists);
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
  }


  //First image already used - REMOVE
  const repeatedElement = document.getElementsByClassName('w-dyn-item')[1];
  repeatedElement.remove();

  if (galleryType == "Narrative") {

    const fourthElement = document.getElementsByClassName('w-dyn-item')[5 - 1];
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
    yetAnotherNewDiv.className = 'linetopright';
    anotherNewDiv.appendChild(yetAnotherNewDiv);
    var andYetAnotherNewDiv = document.createElement("div");
    andYetAnotherNewDiv.className = 'div-block-16';
    anotherNewDiv.appendChild(andYetAnotherNewDiv);
    var andLastAnotherNewDiv = document.createElement("div");
    andLastAnotherNewDiv.className = 'div-block-17';
    anotherNewDiv.appendChild(andLastAnotherNewDiv);

    var textBlock2 = document.createElement("div");
    textBlock2.className = 'text-block-10';
    textBlock2.id = 'Text-Block-Replace-2';
    andLastAnotherNewDiv.appendChild(textBlock2);
    let textBlockContent2 = document.getElementById("Text-Block-2").innerHTML;
    document.getElementById("Text-Block-Replace-2").innerHTML = textBlockContent2;

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
    photoLabelAltContentDiv.id = 'Multi-Image-4-Caption-Block';
    photoLabelAltDiv.appendChild(photoLabelAltContentDiv);

    const finalReplaceElement = document.getElementsByClassName('w-dyn-item')[5 - 1];
    const finalReplaceContent = finalReplaceElement.innerHTML;
    var finalDiv = document.createElement("div");
    finalDiv.className = "leftimageblock";
    finalReplaceElement.innerHTML = "";
    finalReplaceElement.appendChild(finalDiv);
    finalDiv.innerHTML = finalReplaceContent;
  }

	let multiImageAlt = document.getElementById("Multi-Image-0").alt;
  let boldedAlt = multiImageAlt.substring(multiImageAlt.indexOf("*") + 1, multiImageAlt.lastIndexOf("*"));
	let altRemainder = multiImageAlt.substring(multiImageAlt.lastIndexOf("*")+1);
  document.getElementById("Multi-Image-0-Caption-Block").innerHTML = boldedAlt.bold() + "<br/>" + altRemainder;

	var numberofImageElements = document.querySelectorAll('.w-dyn-item').length;
  //console.log("There are", numberofImageElements);
  for (let imgi = 1; imgi < numberofImageElements; imgi++) {
  	var elementToGetAltParent = document.getElementsByClassName('w-dyn-item')[imgi];
    var elementToGetAltImg = elementToGetAltParent.querySelector('img');
    var elementToGetAlt = elementToGetAltImg.alt
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

	/*
	let multiImage4Alt = document.getElementById("Multi-Image-4").alt;
  let bolded4Alt = multiImage2Alt.substring(multiImage4Alt.indexOf("*") + 1, multiImage4Alt.lastIndexOf("*"));
	let alt4Remainder = multiImage2Alt.substring(multiImage4Alt.lastIndexOf("*")+1);
  document.getElementById("Multi-Image-2-Caption-Block").innerHTML = bolded4Alt.bold() + "<br/>" + alt4Remainder;
	*/


const lastImgParentElement = document.getElementsByClassName('w-dyn-item')[numberofImageElements-1];
const lastImgElement = lastImgParentElement.querySelector('img');

lastImgElement.onload = function() {
 var numberofActualImageElements = numberofImageElements-1;
 var imageSizes = [];
 var imageDimensions = {};

 for (let imgis = 1; imgis < numberofActualImageElements; imgis++) {

  let imgParentElement = document.getElementsByClassName('w-dyn-item')[imgis];
  let imgElement = imgParentElement.querySelector('img');

  let width = imgElement.clientWidth;
  let height = imgElement.clientHeight;

  imageDimensions = {"id": imgis, "width": width, "height": height, "alt":  imgElement.alt };
  imageSizes.push(imageDimensions);
 }

 console.log("Final Image Sizes", imageSizes);

 function isImageLandscape(width, height) {
    if (width >= height) {
      return true;
    } else {
      return false;
    }
 }

 //Handle gallery layouts
 switch(galleryType) {
  case "Narrative":

    // 0/1/2 is first row of 3
    if (isImageLandscape(imageSizes[0].width, imageSizes[0].height) && isImageLandscape(imageSizes[1].width, imageSizes[1].height) && isImageLandscape(imageSizes[2].width, imageSizes[2].height)) {
      console.log("All landscape");
      //can now use random lines or not

      let rowImg1Caption = document.getElementById("Multi-Image-1-Caption-Block");
      rowImg1Caption.classList.add("upline");
      var uplinelineDiv = document.createElement("div");
      uplinelineDiv.className = "uplineline";
      rowImg1Caption.prepend(uplinelineDiv);



    } else {
      console.log("Not all landscape");
    }

    break;
  default:
    // code block
}
}



