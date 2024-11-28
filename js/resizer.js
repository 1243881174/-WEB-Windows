function bonresizer(window) {

	//获取8个控件的元素
	let nw = window.querySelectorAll(".nw")[0];
	let n = window.querySelectorAll(".n")[0];
	let ne = window.querySelectorAll(".ne")[0];
	let w = window.querySelectorAll(".w")[0];
	let e = window.querySelectorAll(".e")[0];
	let sw = window.querySelectorAll(".sw")[0];
	let s = window.querySelectorAll(".s")[0];
	let se = window.querySelectorAll(".se")[0];

	let orientation = [nw, n, ne, w, e, sw, s, se];
	//为8个控件绑定动作
	tonw(orientation, nw, window)
	ton(orientation, n, window)
	tone(orientation, ne, window)
	tow(orientation, w, window)
	toe(orientation, e, window)
	tosw(orientation, sw, window)
	tos(orientation, s, window)
	tose(orientation, se, window)
}

function tonw(orientation, nw, window) //左上角
{
	let juedge = false;
	let nowH, nowW, windowtop, windowleft;
	nw.addEventListener("mousedown", (e) => {    //鼠标按下操作同时打开mask遮罩防止点击穿透印象到其他监听事件
		openmask()
		juedge = true;
		nowH = window.offsetHeight;
		nowW = window.offsetWidth;
		windowtop = window.offsetTop;
		windowleft = window.offsetLeft;
	})
	document.getRootNode().addEventListener("mousemove", (e) => {
		if (juedge) { //22
			if (e.pageX + 200 < nowW + windowleft) {
				window.style.left = e.pageX + "px"
			}
			if (window.offsetWidth < 210 && e.pageX < window.offsetLeft) {
				windowleft = nowW + windowleft - 200 + "px"
			}
			window.style.width = nowW + windowleft - window.offsetLeft - 10 + "px";

			if (e.pageY + 200 < nowH + windowtop) {
				window.style.top = e.pageY + 'px';
			}
			if (e.pageY > window.offsetTop && window.offsetHeight < 200) {
				window.style.top = nowH + windowtop - 200 + 'px';
			}
			window.style.height = nowH + windowtop - window.offsetTop - 10 + "px";

		}
	})
	document.getRootNode().addEventListener("mouseup", (e) => {
		juedge = false;
		closemask();   //关闭遮罩
	})
}

function ton(orientation, n, window) //顶部
{
	let juedge = false;
	let nowH, nowW, windowtop;
	n.addEventListener("mousedown", (e) => {
		openmask()
		juedge = true;
		nowH = window.offsetHeight;
		nowW = window.offsetWidth;
		windowtop = window.offsetTop;
	})
	document.getRootNode().addEventListener("mousemove", (e) => {
		if (juedge) {
			if (e.pageY + 200 < nowH + windowtop) {
				window.style.top = e.pageY + 'px';
			}
			if (e.pageY > window.offsetTop && window.offsetHeight < 200) {
				window.style.top = nowH + windowtop - 200 + 'px';
			}
			window.style.height = nowH + windowtop - window.offsetTop - 10 + "px";
		}
	})
	document.getRootNode().addEventListener("mouseup", (e) => {
		juedge = false;
		closemask();
	})
}

function tone(orientation, ne, window) //右上角
{
	let juedge = false;
	let nowH, nowW, windowtop, windowleft;
	ne.addEventListener("mousedown", (e) => {
		openmask()
		juedge = true;
		nowH = window.offsetHeight;
		nowW = window.offsetWidth;
		windowtop = window.offsetTop;
		windowleft = window.offsetLeft;
	})
	document.getRootNode().addEventListener("mousemove", (e) => {
		if (juedge) { //22
			if (e.pageY + 200 < nowH + windowtop) {
				window.style.top = e.pageY + 'px';
			}
			if (e.pageY > window.offsetTop && window.offsetHeight < 200) {
				window.style.top = nowH + windowtop - 200 + 'px';
			}
			window.style.height = nowH + windowtop - window.offsetTop - 10 + "px";

			if (e.pageX > windowleft + 200&&window.offsetWidth>200)
				window.style.width = e.pageX - windowleft + "px";
			else  window.style.width = 200 + "px";
		}
	})
	document.getRootNode().addEventListener("mouseup", (e) => {
		juedge = false;
		closemask();
	})
}

function tow(orientation, w, window) //左边
{
	let juedge = false;
	let nowH, nowW, windowtop, windowleft;
	w.addEventListener("mousedown", (e) => {
		openmask()
		juedge = true;
		nowH = window.offsetHeight;
		nowW = window.offsetWidth;
		windowtop = window.offsetTop;
		windowleft = window.offsetLeft;
	})
	document.getRootNode().addEventListener("mousemove", (e) => {
		if (juedge) { //200
			if (e.pageX + 200 < nowW + windowleft) {
				window.style.left = e.pageX + "px"
			}
			if (window.offsetWidth < 210 && e.pageX < window.offsetLeft) {
				windowleft = nowW + windowleft - 200 + "px"
			}
			window.style.width = nowW + windowleft - window.offsetLeft - 10 + "px";
		}
	})
	document.getRootNode().addEventListener("mouseup", (e) => {
		juedge = false;
		closemask();
	})
}

function toe(orientation, e, window) //右边 
{
	let juedge = false;
	let nowH, nowW, windowtop, windowleft;
	e.addEventListener("mousedown", (e) => {
		openmask()   //防止点击穿透到其他检测器
		juedge = true;
		nowH = window.offsetHeight;
		nowW = window.offsetWidth;
		windowtop = window.offsetTop;
		windowleft = window.offsetLeft;
	})
	document.getRootNode().addEventListener("mousemove", (e) => {
		if (juedge) { //22
			if (e.pageX > windowleft + 200&&window.offsetWidth>200)
				window.style.width = e.pageX - windowleft + "px";
			else  window.style.width = 200 + "px";
		}
	})
	document.getRootNode().addEventListener("mouseup", (e) => {
		juedge = false;
		closemask();
	})
}

function tosw(orientation, sw, window) //左下角
{
	let juedge = false;
	let nowH, nowW, windowtop, windowleft;
	sw.addEventListener("mousedown", (e) => {
		openmask()
		juedge = true;
		nowH = window.offsetHeight;
		nowW = window.offsetWidth;
		windowtop = window.offsetTop;
		windowleft = window.offsetLeft;
	})
	document.getRootNode().addEventListener("mousemove", (e) => {
		if (juedge) { //22
			if (e.pageY >  windowtop + 200&&window.offsetHeight>200)
				window.style.height = e.pageY - windowtop + "px";
			else window.style.height = 200 + "px";
			if (e.pageX + 200 < nowW + windowleft) {
				window.style.left = e.pageX + "px"
			}
			if (window.offsetWidth < 210 && e.pageX < window.offsetLeft) {
				windowleft = nowW + windowleft - 200 + "px"
			}
			window.style.width = nowW + windowleft - window.offsetLeft - 10 + "px";

		}
	})
	document.getRootNode().addEventListener("mouseup", (e) => {
		juedge = false;
		closemask();
	})
}

function tos(orientation, s, window) //下面
{
	let juedge = false;
	let nowH, nowW, windowtop, windowleft;
	s.addEventListener("mousedown", (e) => {
		openmask()
		juedge = true;
		nowH = window.offsetHeight;
		nowW = window.offsetWidth;
		windowtop = window.offsetTop;
		windowleft = window.offsetLeft;
	})
	document.getRootNode().addEventListener("mousemove", (e) => {
		if (juedge) { //22
			if (e.pageY >  windowtop + 200&&window.offsetHeight>200)
				window.style.height = e.pageY - windowtop + "px";
			else window.style.height = 200 + "px";
		}
	})
	document.getRootNode().addEventListener("mouseup", (e) => {
		juedge = false;
		closemask();
	})
}

function tose(orientation, se, window) //右下角
{
	let juedge = false;
	let nowH, nowW, windowtop, windowleft;
	se.addEventListener("mousedown", (e) => {
		openmask()
		juedge = true;
		nowH = window.offsetHeight;
		nowW = window.offsetWidth;
		windowtop = window.offsetTop;
		windowleft = window.offsetLeft;
	})
	document.getRootNode().addEventListener("mousemove", (e) => {
		if (juedge) { //22
			if (e.pageY >  windowtop + 200&&window.offsetHeight>200)
				window.style.height = e.pageY - windowtop + "px";
			else window.style.height = 200 + "px";
			if (e.pageX > windowleft + 200&&window.offsetWidth>200)
				window.style.width = e.pageX - windowleft + "px";
			else  window.style.width = 200 + "px";

		}
	})
	document.getRootNode().addEventListener("mouseup", (e) => {
		juedge = false;
		closemask();
	})
}
