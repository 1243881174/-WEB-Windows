
	let W = document.body.clientWidth;
	let H = document.body.clientHeight;

	let ration = 0.9;
	box.style.width = H * ration + "px";
	box.style.height = H * ration + "px";
	window.onresize = function() {
		W = document.body.clientWidth;
		H = document.body.clientHeight;
		box.style.width = H * ration + "px";
		box.style.height = H * ration + "px";
	};






