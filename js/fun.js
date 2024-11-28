let nowpage = 0;

//翻页函数
function rightpage() {
	nowpage++;
	content.style.left = -nowpage * W + "px"
	paged = false
}

function leftpage() {
	if (nowpage > 0) {
		nowpage--;
		content.style.left = -nowpage * W + "px"
	}
}
//保存初始页面
winset()

let cloneMain_interface = main_interface.cloneNode();
cloneMain_interface.innerHTML = main_interface.innerHTML
//插入页面
function insertpage() {

	let div = createEle("div")
	let close = createEle("div");
	close.className = "close fa fa-close fa-3x "

	close.onclick = function() {
		leftpage();
		this.parentNode.remove();

		contentAlldiv = $("content>div");
		content.style.width = contentAlldiv.length * 100 + "%";
	}


	let interface = cloneMain_interface.cloneNode();
	interface.innerHTML = cloneMain_interface.innerHTML

	div.appendChild(interface);
	bonwinset(div);
	div.appendChild(close);
	content.appendChild(div);

	contentAlldiv = $("content>div");
	content.style.transition = "";

	content.style.width = contentAlldiv.length * 100 + "%";

	wait(function() {
		content.style.transition = `all 0.5s ease-in-out`;
	}, 50)

	appbon(contentAlldiv[contentAlldiv.length - 1]);
	BonBoxtochoose(contentAlldiv[contentAlldiv.length - 1]);
	bonwinset(contentAlldiv[contentAlldiv.length - 1])

};
//初始化设置
insertpage();   //一来插入一个页面保证在翻页的时候不会出现白边（加载过程）
rightpage();
leftpage();

//翻页基础代码    --设置监听器
(function() {
	let juedge = false;
	let minx = 0,
		maxx = 0;
	document.addEventListener("mousedown", (e) => {
		if (e.button == 2)
			rightdown();    //打开右键菜单栏
		if (e.button == 1) {
			juedge = true;
			minx = e.screenX;
		}
	})
	document.addEventListener("mousemove", (e) => {
		clearmenu();
		if (juedge)
			maxx = e.screenX;

	})
	document.addEventListener("mouseup", (e) => {
		if (minx - maxx > 200 && maxx) { //右翻
			while(nowpage + 2 >= contentAlldiv.length)
				insertpage(); //插入页面
			wait(function() {
				rightpage();
			}, 100);
		} else if (minx - maxx < -200 && maxx) { //左翻
			leftpage();
		};
		minx = 0, maxx = 0;
		juedge = false;
	});

})();
//绑定app事件
function appbon(screen) {
	let appAll = screen.querySelectorAll(".app");
	for (let i = 0; i < appAll.length; i++) {

		appAll[i].onclick = function(e) {
			if (!e.ctrlKey) {      //判断当前是否按住了ctrl，如果没有按住则先清除所有app高亮
				clearapplight()    //显示再高亮显示当前点击的app
			}
			e.stopPropagation();          
			this.classList.add("light")       //任意地点单击后清楚app的高亮显示
			this.mask = true;
		};
		appAll[i].ondblclick = function() {    //双击后app后执行窗口的初始化函数并取消所有的高亮显示
			creatappdow(this);
			clearapplight();
		}
	}
};

//初始设置绑定
appbon(contentAlldiv[nowpage]);
BonBoxtochoose(contentAlldiv[nowpage]);
bonwinset(contentAlldiv[nowpage])
//选择取消

//打开关闭遮罩
function openmask() {
	for (let i = 0; i < mask.length; i++) mask[i].style.display = "block";
}

function closemask() {
	for (let i = 0; i < mask.length; i++) {
		mask[i].style.display = "none";
	}
}

function clearapplight() {
	let appAll = contentAlldiv[nowpage].querySelectorAll(".app");
	for (let i = 0; i < appAll.length; i++) {
		if (appAll[i].mask) {
			appAll[i].classList.remove("light")
			appAll[i].mask = false;
		}
	};
}


//翻页动画的打开关闭
function notice(text) {
	let notice = document.querySelector("#notice");

	notice.innerText = text;
	notice.style.transform = "translateX(-50%) translateY(0%)"

	setTimeout(() => {
		notice.style.transform = "translateX(-50%) translateY(-100%)"
		notice.innerText = "";
	}, 2000)
}

document.addEventListener("keydown", (e) => {
	let k = e.key;

	if (e.ctrlKey) {
		
		if (k == "ArrowRight") {
			while(nowpage + 2 >= contentAlldiv.length)
				insertpage(); //插入页面
				rightpage();
		}
		if (k == "ArrowLeft") {
			leftpage();
		}
		if (k == "a" || k == "A") {
			let appAll = contentAlldiv[nowpage].querySelectorAll(".app");
			for (let i = 0; i < appAll.length; i++) {
					appAll[i].classList.add("light")
					appAll[i].mask = true;
				}
		}
	}

})
