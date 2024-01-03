
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
  img.removeAttribute("sizes");
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
                  //console.log("no fig");
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
  }


  //First image already used - REMOVE
  const repeatedElement = document.getElementsByClassName('w-dyn-item')[1];
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

  var imageSizes = [];
  imageSizes = getLoadedImages();

    // 0/1/2 is first row of 3
    if (isImageLandscape(imageSizes[0].width, imageSizes[0].height) && isImageLandscape(imageSizes[1].width, imageSizes[1].height) && isImageLandscape(imageSizes[2].width, imageSizes[2].height)) {
      console.log("All landscape");

      let rowImg1Caption = document.getElementById("Multi-Image-1-Caption-Block");
      rowImg1Caption.classList.add("upline");
      var uplinelineDiv = document.createElement("div");
      uplinelineDiv.className = "uplineline";
      rowImg1Caption.prepend(uplinelineDiv);

      let rowImg5Caption = document.getElementById("Multi-Image-5-Caption-Block");
      rowImg5Caption.classList.remove("captiontitleoverimage");
      rowImg5Caption.classList.add("upline");
      var uplineline5Div = document.createElement("div");
      uplineline5Div.className = "uplineline";
      rowImg5Caption.prepend(uplineline5Div);

      let rowImg7Caption = document.getElementById("Multi-Image-7-Caption-Block");
      rowImg7Caption.classList.remove("captiontitleoverimage");
      rowImg7Caption.classList.add("downline");
      rowImg7Caption.classList.add("reverse");
      var uplineline7Div = document.createElement("div");
      uplineline7Div.className = "downlineline";
      rowImg7Caption.append(uplineline7Div);
      if(rowImg7Caption.previousElementSibling)
        rowImg7Caption.parentNode.insertBefore(rowImg7Caption, rowImg7Caption.previousElementSibling);

      let rowImg8Caption = document.getElementById("Multi-Image-8-Caption-Block");
      rowImg8Caption.classList.remove("captiontitleoverimage");
      rowImg8Caption.classList.add("upline");
      var uplineline8Div = document.createElement("div");
      uplineline8Div.className = "uplineline";
      rowImg8Caption.prepend(uplineline8Div);

      let rowImg9Caption = document.getElementById("Multi-Image-9-Caption-Block");
      rowImg9Caption.classList.remove("captiontitleoverimage");
      rowImg9Caption.classList.add("downline");
      rowImg9Caption.classList.add("reverse");
      var uplineline9Div = document.createElement("div");
      uplineline9Div.className = "downlineline";
      rowImg9Caption.append(uplineline9Div);
      if(rowImg9Caption.previousElementSibling)
        rowImg9Caption.parentNode.insertBefore(rowImg9Caption, rowImg9Caption.previousElementSibling);

      let rowImg11Caption = document.getElementById("Multi-Image-11-Caption-Block");
      rowImg11Caption.classList.remove("captiontitleoverimage");
      rowImg11Caption.classList.add("downline");
      rowImg11Caption.classList.add("reverse");
      var uplineline11Div = document.createElement("div");
      uplineline11Div.className = "downlineline";
      rowImg11Caption.append(uplineline11Div);
      if(rowImg11Caption.previousElementSibling)
        rowImg11Caption.parentNode.insertBefore(rowImg11Caption, rowImg11Caption.previousElementSibling);

      let rowImg12Caption = document.getElementById("Multi-Image-12-Caption-Block");
      rowImg12Caption.classList.remove("captiontitleoverimage");
      rowImg12Caption.classList.add("upline");
      var uplineline12Div = document.createElement("div");
      uplineline12Div.className = "uplineline";
      rowImg12Caption.prepend(uplineline12Div);

      let rowImg16Caption = document.getElementById("Multi-Image-16-Caption-Block");
      rowImg16Caption.classList.remove("captiontitleoverimage");
      rowImg16Caption.classList.add("upline");
      var uplineline16Div = document.createElement("div");
      uplineline16Div.className = "uplineline";
      rowImg16Caption.prepend(uplineline16Div);


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
  var loadedImageSizes = [];
  var imageDimensions = {};

  for (let imgis = 1; imgis < numberofActualImageElements; imgis++) {

    let imgParentElement = document.getElementsByClassName('w-dyn-item')[imgis];
    let imgElement = imgParentElement.querySelector('img');

    let width = imgElement.clientWidth;
    let height = imgElement.clientHeight;

    imageDimensions = {"id": imgis, "width": width, "height": height, "alt":  imgElement.alt };
    loadedImageSizes.push(imageDimensions);
  }
  return loadedImageSizes;
}



