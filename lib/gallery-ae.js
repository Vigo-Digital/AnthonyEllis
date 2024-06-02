
	document.querySelector('.w-condition-invisible').remove();

	var galleryType = document.getElementById("GalleryTemplate").innerHTML;
	console.log("Gallery Type", galleryType);


	//Set the section correctly
	var sectionTemplateName = document.getElementById("NarrativeTemplate");
	if (galleryType == "Uniform") {
		sectionTemplateName.id = "UniformTemplate";
		sectionTemplateName.classList.replace("narrativetemplate", "uniformtemplate");
	} else if (galleryType == "Single-column") {
		sectionTemplateName.id = "SingleColumnTemplate";
		sectionTemplateName.classList.replace("narrativetemplate", "singlecolumntemplate");
	}

	let textBlock1 = document.getElementById("Text-Block-1").innerHTML;
	if (textBlock1 != "") {
		document.getElementById("Text-Block-Replace-1").innerHTML = textBlock1;
	} else {
		document.getElementById("0TopLeft").remove();
	}

	//First image already used - REMOVE
	const repeatedElement = document.getElementsByClassName('w-dyn-item')[1];
	repeatedElement.remove();

	function getAndCheckAllPortalsTwo(caption) {

		var portals = document.querySelectorAll(".portal-door");
		var portalUrls = document.querySelectorAll(".portal-gallery");
		var portalSlugs = document.querySelectorAll(".portal-slug");
		var allPortals = new Array();
		for (portali = 0; portali < portals.length; portali++) {
			var portalDetail = {"Alt":portals[portali].innerHTML, "Gallery":portalUrls[portali].innerHTML, "Slug":portalSlugs[portali].innerHTML};
			allPortals[portali] = portalDetail;
		}
		var matchedAlt = false;
		var dupePortals = allPortals;
		var portalNum = 0;
		allPortals.forEach((portal) => {
			//console.log("Portal caption is", portal.Alt);
			//console.log("Looking for", caption);

			if(portal.Alt == caption) {
				console.log("FOUND PORTAL");
				matchedAlt = true;
				console.log("The slug you want is", portal.Slug);
				sluggy = portal.Slug;
			}
			portalNum++;
		});


		//var randomPortal = dupePortals[Math.floor(Math.random()*dupePortals.length)];
		if (matchedAlt) {
			let gotoPortal = "";
			allPortals.forEach((portal) => {
				console.log("Try matching portal", portal.Slug);
				console.log("against", sluggy);

				if (portal.Slug == sluggy) {
					console.log("Matched Slug")
					let gotoPortal = portal;
					return gotoPortal;
				}
			});
		} else {
			return false;
		}
	}

	/*
	async function getAndCheckAllPortals(caption) {
		try {
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

				var matchedAlt = false;
				var dupePortals = allPortals;
				var portalNum = 0;

				allPortals.forEach((portal) => {
					//console.log("Portal alt is", portal.Alt);
					//console.log("Alt is", caption);
					if(portal.Alt == caption) {
						matchedAlt = true;
						delete dupePortals[portalNum];
					}
					portalNum++;
				});

				var randomPortal = dupePortals[Math.floor(Math.random()*dupePortals.length)];

				if (matchedAlt) {
					return randomPortal;
				} else {
					return false;
				}
		} catch (error) {
			console.log(error);
		}
	}
	*/


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
console.log("Number of Images", allImages.length);
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


			// Hide & De-activate the main nav when lightbox is opened
			// console.log('lightbox open 10');

			var htmlElement = document.querySelector('html');
			var bodyElement = document.querySelector('body');
			var mainNav = document.querySelector('.main-nav');
			var computedStyle = window.getComputedStyle(mainNav);

			if (htmlElement.classList.contains('w-lightbox-noscroll')) { // Lightbox just opened

				if (computedStyle.opacity === '1') { // Check if nav was visible
					bodyElement.classList.add('js-nav-was-visible');
				}

				mainNav.style.opacity = '0';

			} else { // Lightbox just closed

				var hasClass = bodyElement.classList.contains('js-nav-was-visible');

				if (hasClass) { // If nav was visible before open, show it again
					mainNav.style.opacity = '1';
					bodyElement.classList.remove('js-nav-was-visible');
				} else {
					mainNav.style.opacity = '0';
				}

			}




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
											figcaption.innerHTML = toTitleCase(boldedLBAlt.bold()) + "<br/>" + altLBRemainder.toUpperCase();
											container.prepend(figcaption);

											//check if PORTAL!
											/*getAndCheckAllPortals(boldedLBAlt).then(result => {
												console.log("is portal", result);
												if ((result != false) && (result != undefined)) {
													figureLB.id = "portal";

													console.log("result", result);

													var wrapper = document.createElement('a');
													var gallery = result.Gallery;
													wrapper.setAttribute('href', "/galleries/" + gallery.replace(/\s+/g, '-').toLowerCase() + "#" + result.Alt);
													wrapper.appendChild(imgLB.cloneNode(true));
													imgLB.parentNode.replaceChild(wrapper, imgLB);

													//lets add a door emoji
													var lbfigcaptionDoor = document.querySelectorAll(".lb-figcaption");
													lbfigcaptionDoor[0].insertAdjacentHTML('beforeend', "<a href='" + portalURL + "'>🚪</a>");
												}

											}).catch(err => {
												console.log("error", err);
											});*/

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
											figExists.innerHTML = toTitleCase(boldedLBAlt.bold()) + "<br/>" + altLBRemainder.toUpperCase();

											//check if PORTAL!
											/*
											getAndCheckAllPortals(boldedLBAlt).then(result => {
												console.log("is portal", result);
												if ((result != false) && (result != undefined)) {
													figureLB.id = "portal";

													var wrapper = document.createElement('a');
													var gallery = result.Gallery;
													var portalURL = "/galleries/" + gallery.replace(/\s+/g, '-').toLowerCase() + "#" + result.Alt;
													wrapper.setAttribute('href', portalURL);
													wrapper.appendChild(imgLB.cloneNode(true));
													imgLB.parentNode.replaceChild(wrapper, imgLB);

													//lets add a door emoji
													var lbfigcaptionDoor = document.querySelectorAll(".lb-figcaption");
													lbfigcaptionDoor[0].insertAdjacentHTML('beforeend', "<a href='" + portalURL + "'>🚪</a>");
												}

											}).catch(err => {
												console.log("error", err);
											});*/

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

	function createTextBlock(position, style, number) {
		//console.log("Create Text Block inside");

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
				anotherNewDiv.className = 'div-block-14-left';
				fourthElement.appendChild(anotherNewDiv);
				var yetAnotherNewDiv = document.createElement("div");
				yetAnotherNewDiv.className = style;
				anotherNewDiv.appendChild(yetAnotherNewDiv);
				var andYetAnotherNewDiv = document.createElement("div");
				andYetAnotherNewDiv.className = 'div-block-16';
				anotherNewDiv.appendChild(andYetAnotherNewDiv);
				var andLastAnotherNewDiv = document.createElement("div");
				andLastAnotherNewDiv.className = 'div-block-17-left';
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

				var photoLabelAltDiv = document.createElement("div");
				photoLabelAltDiv.className = 'div-block-32';
				photoLabelDiv.appendChild(photoLabelAltDiv);

				var photoLabelLineDiv = document.createElement("div");
				photoLabelLineDiv.className = 'div-block-31';
				photoLabelDiv.appendChild(photoLabelLineDiv);

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


			createTextBlock(4, "linetopleft", 2);
			createTextBlock(10, "linetopleft", 3);


	}

	//console.log("here2");
	let multiImageAlt = document.getElementById("Multi-Image-0").alt;
	//console.log("multiImageAlt1", document.getElementById("Multi-Image-0").alt);
	//console.log("multiImageAlt", multiImageAlt.innerHTML);

	if (multiImageAlt == undefined || multiImageAlt == "") {
		document.getElementById("0leftline").remove();
	}

	let boldedAlt = multiImageAlt.substring(multiImageAlt.indexOf("*") + 1, multiImageAlt.lastIndexOf("*"));
	let altRemainder = multiImageAlt.substring(multiImageAlt.lastIndexOf("*")+1);
	document.getElementById("Multi-Image-0-Caption-Block").innerHTML = toTitleCase(boldedAlt.bold()) + "<br/>" + altRemainder.toUpperCase();

	var numberofImageElements = document.querySelectorAll('.w-dyn-item').length;
	console.log("There are", numberofImageElements);
	for (let imgi = 1; imgi < numberofImageElements; imgi++) {
		//console.log("can I check this item", document.getElementsByClassName('w-dyn-item')[imgi]);
		var elementToGetAltParent = document.getElementsByClassName('w-dyn-item')[imgi];
		if (elementToGetAltParent.classList.contains("mapcarousel-slide")) {
			continue;
		}
		var elementToGetAltImg = elementToGetAltParent.querySelector('img');
		var elementToGetAlt = "";
		if (elementToGetAltImg) {
			if (elementToGetAltImg.alt) {
				elementToGetAlt = elementToGetAltImg.alt;
			}
		}
		//create anchor
		if (elementToGetAltImg != "") {
			//console.log("elementToGetAltImg", elementToGetAltImg);
			if (elementToGetAltImg != null) {

				let clearedAltFormat = elementToGetAltImg.alt.substring(elementToGetAltImg.alt.indexOf("*") + 1, elementToGetAltImg.alt.lastIndexOf("*"));
				elementToGetAltImg.parentElement.id = clearedAltFormat;
			}
		}
		if (elementToGetAlt != "") {
			//console.log("$$$", elementToGetAlt.indexOf("$"));
			let boldedAlt = elementToGetAlt.substring(elementToGetAlt.indexOf("*") + 1, elementToGetAlt.lastIndexOf("*"));
			let altRemainder = elementToGetAlt.substring(elementToGetAlt.lastIndexOf("*")+1);
			let tmpNum = imgi;
			var multiImageBlockName = "Multi-Image-" + tmpNum + "-Caption-Block"
			if (document.getElementById(multiImageBlockName)) {
				document.getElementById(multiImageBlockName).className = "captionblock div-block-20";
				document.getElementById(multiImageBlockName).innerHTML = toTitleCase(boldedAlt.bold()) + "<br/>" + altRemainder.toUpperCase();
		 	} else {
				var photoLabelAltContentDiv = document.createElement("div");
				photoLabelAltContentDiv.id = multiImageBlockName;
				if ((galleryType == "Narrative") && (imgi == 1)) {
					photoLabelAltContentDiv.className = "captionblock";
				} else {
					if (elementToGetAlt.indexOf("$") != 0) {
						photoLabelAltContentDiv.className = "captionblock captiontitleoverimage";
					} else {
						photoLabelAltContentDiv.className = "captionblock";
					}
				}
				elementToGetAltParent.appendChild(photoLabelAltContentDiv);
				photoLabelAltContentDiv.innerHTML = toTitleCase(boldedAlt.bold()) + "<br/>" + altRemainder.toUpperCase();
			}
		}
	}

	function toTitleCase(str) {
		return str.replace(
			/\w\S*/g,
			function(txt) {
				if ((txt != "and") && (txt != "And") && (txt != "AND") && (txt != "OF") && (txt != "Of") && (txt != "of")) {
					return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
				} else {
					return txt.charAt(0).toLowerCase() + txt.substr(1).toLowerCase();
				}
			}
		);
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
		//console.log("image id for debugging", id);
		if (type == "up") {
			if (removeCaption) {
				if (rowImgLineCaption) {
					rowImgLineCaption.classList.remove("captiontitleoverimage");
				}
			}
			//console.log("allImages.length", allImages.length);

			if (rowImgLineCaption) {
				rowImgLineCaption.classList.add("upline");
				var uplinelineDiv = document.createElement("div");
				uplinelineDiv.className = "uplineline";
				rowImgLineCaption.prepend(uplinelineDiv);
			}
		} else if (type == "down") {
			if (removeCaption) {
				if (rowImgLineCaption) {
					rowImgLineCaption.classList.remove("captiontitleoverimage");
				}
			}
			if (rowImgLineCaption) {
				rowImgLineCaption.classList.add("downline");
				rowImgLineCaption.classList.add("reverse");
				var uplinelineDiv = document.createElement("div");
				uplinelineDiv.className = "downlineline";
				rowImgLineCaption.append(uplinelineDiv);
				if(rowImgLineCaption.previousElementSibling)
					rowImgLineCaption.parentNode.insertBefore(rowImgLineCaption, rowImgLineCaption.previousElementSibling);
			}
		}
	}

	//Handle gallery layouts
 switch(galleryType) {
	case "Narrative":

		var imageSizes = [];
		imageSizes = getLoadedImages();

		// 0/1/2 is first row of 3
		if (isImageLandscape(imageSizes[0].width, imageSizes[0].height) && isImageLandscape(imageSizes[1].width, imageSizes[1].height) && isImageLandscape(imageSizes[2].width, imageSizes[2].height)) {
			//console.log("All landscape");

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
			//console.log("Not all landscape");
		}

		break;
	case "Uniform":

		//First image already used - REMOVE
		//const repeatedElement = document.getElementById('UniformFirstBlock').firstChild;
		//console.log(repeatedElement);
		//repeatedElement.remove();

		var imageSizes = [];
		imageSizes = getLoadedImages();

		createLine("up", 1, false);
		createLine("up", 2, false);
		createLine("up", 7, false);
		createLine("up", 9, false);
		createLine("up", 10, false);
		createLine("up", 11, false);

		break;
	case "Single-column":

		var imageSizes = [];
		imageSizes = getLoadedImages();

		/*for (var k = 1; k <= allImages.length; k++) {
			createLine("up", k, false);
		}*/
		for (var k = 0; k <= allImages.length; k++) {
			if (isImageLandscape(allImages[k].width, allImages[k].height)) {
				//console.log(k + " image is landscape");
			} else {
				//console.log(k + " image is portrait");
				//console.log(allImages[k].parentElement);
				let portraitImageHref = allImages[k].parentElement;
				let portraitImageDiv = portraitImageHref.parentElement;
				portraitImageDiv.classList.add("portraitImage");
			}
		}

		break;
	default:
		var imageSizes = [];
		imageSizes = getLoadedImages();
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
	//console.log("Actual Image Ele", numberofActualImageElements);
	var loadedImageSizes = [];
	var imageDimensions = {};

	for (let imgis = 1; imgis < numberofActualImageElements; imgis++) {
		//console.log("imgis", imgis);
		let imgParentElement = document.getElementsByClassName('w-dyn-item')[imgis];
		let imgElement = imgParentElement.querySelector('img');

		let formatClearedAlt = imgElement.alt.substring(imgElement.alt.indexOf("*") + 1, imgElement.alt.lastIndexOf("*"));

		//console.log("Looking for Portal", formatClearedAlt);
		let foundPortal = getAndCheckAllPortalsTwo(formatClearedAlt);

		if (foundPortal) {
			console.log("Portal Found");
			console.log(foundPortal.Gallery);
			var wrapper = document.createElement('a');
			var gallery = foundPortal.Gallery;
			wrapper.setAttribute('href', "/galleries/" + gallery.replace(/\s+/g, '-').toLowerCase() + "?lightbox=" + foundPortal.Alt + "#" + foundPortal.Alt);
			wrapper.appendChild(imgElement.cloneNode(true));
			wrapper.classList.add("portalcursor");
			imgElement.parentNode.replaceChild(wrapper, imgElement);
			wrapper.parentNode.replaceWith(wrapper);
		}

		if (imgElement) {
			let width = imgElement.clientWidth;
			let height = imgElement.clientHeight;

			imageDimensions = {"id": imgis, "width": width, "height": height, "alt":  imgElement.alt };
			loadedImageSizes.push(imageDimensions);
		}
	}
	return loadedImageSizes;
}






