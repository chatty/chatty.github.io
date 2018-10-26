
function slideshow_init(slideshowId) {
	let element = document.getElementById(slideshowId);
	if (element === null) {
		return;
	}
	let images = element.getElementsByTagName("img");
	let mainImageElement = images[0];
	
	let newElement = '<a href="'+mainImageElement.src+'"><img src="'+mainImageElement.src+'" title="'+mainImageElement.title+'" /></a>';
	images[1].parentElement.insertAdjacentHTML('beforebegin', newElement);

	for (let i=1;i<images.length;i++) {
		images[i].parentElement.onclick = function(evt) {
			evt.preventDefault();
			slideshow_show(slideshowId, images[i]);
		};
	}

	let prevButton = element.getElementsByClassName("slideshow_prev")[0];
	let nextButton = element.getElementsByClassName("slideshow_next")[0];

	prevButton.onclick = evt => slideshow_move(slideshowId, -1);
	nextButton.onclick = evt => slideshow_move(slideshowId, +1);

	let hiddenElements = element.getElementsByClassName("slideshow_hidden");
	for (let i = hiddenElements.length - 1; i >= 0; i--) {
		hiddenElements[i].classList.remove("slideshow_hidden");
	}

	slideshow_show(slideshowId, images[1]);
}

function slideshow_move(slideshowId, step) {
	let element = document.getElementById(slideshowId);
	let images = element.getElementsByTagName("img");
	for (let i=1;i<images.length;i++) {
		if (hasClass(images[i], "slideshow_active_image")) {
			let next = i + step;
			if (next < 1) {
				next += images.length - 1;
			} else if (next >= images.length) {
				next -= images.length - 1;
			}

			slideshow_show(slideshowId, images[next]);
			return;
		}
	}
}

function slideshow_show(slideshowId, imageElement) {
	let element = document.getElementById(slideshowId);
	let active = element.getElementsByClassName("slideshow_active_image");
	if (active[0] === imageElement) {
		return;
	}
	let images = element.getElementsByTagName("img");
	images[0].style.opacity = 0;

	for (let i=1;i<images.length;i++) {
		let image = images[i];
		if (image == imageElement) {
			images[0].src = image.src;
			images[0].title = image.title;
			image.className += " slideshow_active_image";
		} else {
			image.className = image.className.replace(" slideshow_active_image","");
		}
	}

	let captionElement = element.getElementsByClassName("slideshow_caption")[0];
	captionElement.innerHTML = imageElement.title;
	setTimeout(() => { images[0].style.opacity = 1 }, 0);
}

function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
}
