	let textBlock1 = document.getElementById("Text-Block-1").innerHTML;
  document.getElementById("Text-Block-Replace-1").innerHTML = textBlock1;

  //First image already used - REMOVE
  const repeatedElement = document.getElementsByClassName('w-dyn-item')[1];
  repeatedElement.remove();

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
  yetAnotherNewDiv.className = 'div-block-15';
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
  finalDiv.className = "leftimg-textblock";
  finalReplaceElement.innerHTML = "";
  finalReplaceElement.appendChild(finalDiv);
  finalDiv.innerHTML = finalReplaceContent;

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
      	document.getElementById(multiImageBlockName).className = "captionblock";
      	document.getElementById(multiImageBlockName).innerHTML = boldedAlt.bold() + "<br/>" + altRemainder;
     	} else {
      	var photoLabelAltContentDiv = document.createElement("div");
  			photoLabelAltContentDiv.id = multiImageBlockName;
        photoLabelAltContentDiv.className = "captionblock";
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
 var numberofActualImageElements =numberofImageElements-1;
 for (let imgis = 1; imgis < numberofActualImageElements; imgis++) {

  var imgParentElement = document.getElementsByClassName('w-dyn-item')[imgis];
  var imgElement = imgParentElement.querySelector('img');

  var width = imgElement.clientWidth;
  var height = imgElement.clientHeight;
  console.log("Image size for", imgElement.alt);
  console.log("sizew", width);
  console.log("sizeh", height);
 }

}


