let lastx, lasty;
let lastW,lastH;
let appid = 0;

let mask = [];

function creatappdow(element) {
	let title = element.querySelectorAll("p")[0];
	let window = document.createElement("div");   //创建一个dom元素
	window.className = "appwindow"
	//为这个dom元素赋予内容和控件
	window.innerHTML = `<div class="appwindowtop">
							<div class="title">${title.innerText}</div>
							<div class="minimize fa fa-window-minimize "></div>
							<div class="maximize fa fa-window-maximize"></div>
							<div class="xx fa fa-window-close"></div>
						</div>
						<div class="progress">
							<iframe src="${element.getAttribute("url")}"></iframe>
						</div>
						<div class="resizer">
							<div class="nw"></div>
							<div class="n"></div>
							<div class="ne"></div>
							<div class="w"></div>
							<div class="see">
							</div>
							<div class="e"></div>
							<div class="sw"></div>
							<div class="s"></div>
							<div class="se"></div>
						</div>
					<div class="mask"></div>`
	// nw:左上角控件   n:top控件   ne:右上角控件   w:左侧控件   see:正中间视图
	// e:右边控件   sw:左下角控件   s:正下控件   se:右下角控件
	window.id = appid;
	contentAlldiv[nowpage].appendChild(window);   //把dom元素添加值html的主界面中
	
	getWH(window);
	//初始位置大小设置
	window.style.visibility = "visible"  
	window.style.left = W / 2 - window.offsetWidth / 2 + "px";
	window.style.top = H / 2 - window.offsetHeight / 2 + "px";
	
	//设置显示优先级级
	appwindow = $(".appwindow");
	window.style.zIndex = ++index;

	//添加iframe 绑定     当点击iframe时，为优先级置顶
	let iframe = window.querySelectorAll("iframe")[0]
	iframe.onload = function() {
		iframe.contentDocument.getRootNode().addEventListener("mousedown", function() {
				let taskbar=contentAlldiv[nowpage].querySelectorAll(".section>div");    //任务栏同步修改优先级
				for(i=0;i<taskbar.length;i++)
				{
					if(taskbar[i].id==window.id){
						sectionlight(taskbar[i])
						break; 
					}
				}
			window.style.zIndex = ++index;    //显示优先级置顶
			changeStyle(window)
		})
	}
	//获取app遮罩 放入数组
	mask.push(window.querySelectorAll(".mask")[0]);
	
	bonresizer(window)  //绑定大小缩放
	setsection(contentAlldiv[nowpage], window, element); //任务栏
	changeStyle(window)  //改变初始样式
	
	window.querySelectorAll(".xx")[0].onclick = function(e) {    //关闭按钮绑定
		e.stopPropagation();
		contentAlldiv[nowpage].removeChild(this.parentNode.parentNode);    //删除父元素

		closesection(contentAlldiv[nowpage], window);    //修改任务栏

	}
	
	maxminzeclick(window);   //放大按钮绑定

	window.querySelectorAll(".minimize")[0].onclick = function(e) {   	//缩小按钮绑定
		e.stopPropagation();
		let taskbar=contentAlldiv[nowpage].querySelectorAll(".section>div");
		taskbar.forEach(function(item) {
			item.classList.remove("light");
		})
		window.style.visibility = "hidden";
	}
	//拖拽绑定
	drag(window);
};

function drag(window) {
	let title = window.querySelectorAll(".title")[0];
	title.style.width = "80%";   //初始化标题

	let startx, starty;
	let juedge = false;
	let isdblclick = 0;    //双击判断标准
	
	title.addEventListener("mousedown", (e) => {
		e.stopPropagation();
		isdblclick++;
		setTimeout(function() {
			isdblclick = 0
		}, 200)
		juedge = true
		if (isdblclick == 2) {       //在短时间内双击2次则认为是放大操作，不进行下一步
			window.querySelectorAll(".maximize")[0].onclick(e);  //执行双击操作
			juedge = false;
		}
		//考虑到有的时候不是以置顶为拖拽目标
		window.style.zIndex = ++index;    
		let taskbar=contentAlldiv[nowpage].querySelectorAll(".section>div");   //对任务栏相关图标进行“活动”设置
		for(i=0;i<taskbar.length;i++)
		{
			if(taskbar[i].id==window.id){
				sectionlight(taskbar[i])
				break; 
			}
		}
		changeStyle(window)
		startx = e.pageX - window.offsetLeft;
		starty = e.pageY - window.offsetTop;
		 openmask()    //打开遮罩，防止点击时间穿透到ifram中的页面
	});

	document.getRootNode().addEventListener("mousemove", (e) => {
		e.stopPropagation();
		if (juedge) {  //必须是鼠标按下后才能进行拖拽移动
			if (title.style.width == "85%") {
				suoxiao(window);
				startx = window.offsetLeft + window.W / 2;
				starty = window.offsetTop + e.pageY;
				window.style.left = e.pageX - startx + "px";
				window.style.top = e.pageY - starty + "px";
				return;
			}
			window.style.left = e.pageX - startx + "px";
			window.style.top = e.pageY - starty + "px";

		}
	});
	document.getRootNode().addEventListener("mouseup", (e) => {
		e.stopPropagation();
		if (parseInt(window.style.top) < 0) {
			window.style.top = 0 + "px"
		}
		if (H - foot.offsetHeight - title.offsetHeight < parseInt(window.style.top)) {
			window.style.top = H - foot.offsetHeight - title.offsetHeight + "px";
		}
		startx = starty = 0
		juedge = false;

		closemask()
	});
};

function changeStyle(window) {
	removestyle(window)
	window.style.boxShadow = "#000 -5px 5px 15px";
	window.style.border = "5px solid rgba(255, 232, 102, 0.8)";
};

function removestyle(window) {
	let allappwindow = $(".appwindow");
	for (let i = 0; i < allappwindow.length; i++) {
		allappwindow[i].style.boxShadow = "none";
		allappwindow[i].style.border = "5px solid rgba(128,128,128,.8)";
	}
};

function maxminzeclick(window) {

	let toptitle = window.querySelectorAll(".title")[0];
	lastx = window.offsetLeft;
	lasty = window.offsetTop;
	lastW = window.offsetWidth;
	lastH =window.offsetHeight

	window.querySelectorAll(".maximize")[0].onclick = function(e) {
		e.stopPropagation();
		if (toptitle.style.width == "80%") //放大
		{
			//记录放大前的相关位置
			lastx = window.offsetLeft; 
			lasty = window.offsetTop;
			lastW = window.offsetWidth;
			lastH =window.offsetHeight
			fangda(window)
		} else { //缩小
			suoxiao(window)
			window.style.left = lastx + "px"
			window.style.top = lasty + "px"
			window.style.width = lastW + "px"
			window.style.height = lastH + "px"
		}

	};
};

function fangda(window) {
	let toptitle = window.querySelectorAll(".title")[0];
	let icon = window.querySelectorAll(".maximize")[0];    //获取当前活动窗口放大缩小的这个元素
	window.style.transition = "all 0.3s ease-out";
	window.querySelectorAll(".resizer")[0].style.display="none"    //暂时关闭自定义大小控件的功能
	
	wait(function() {            //10ms后执行放大的样式改变
		if (toptitle.style.width == "80%") {
			icon.className = "maximize fa fa-window-restore";      //修改图标  
			window.style.left = "0px"
			window.style.top = "0px"
			window.style.width = "100%";
			window.style.height = H - foot.offsetHeight + "px";
			toptitle.style.width = "85%";     //顶部控制最高只能调到85%，多了会挤压其他，因此充当判断条件
		}
	}, 10);
	setTimeout(() => {     //一段时候后删除动画属性，防止在其他操作时出发动画的属性
		window.style.transition = "";
	}, 310);

};

function suoxiao(window) {
	let toptitle = window.querySelectorAll(".title")[0];
	let icon = window.querySelectorAll(".maximize")[0];
	window.querySelectorAll(".resizer")[0].style.display="grid"   //开启自定义大小控件的功能
	window.style.transition = "all 0.3s ease-out";
	wait(() => {
		if (toptitle.style.width == "85%") {
			window.style.width = lastW+"px";
			window.style.height = lastH+"px";
			toptitle.style.width = "80%";
			window.W=lastW;
			window.H=lastH;
			icon.className = "maximize fa fa-window-maximize";
		}
	}, 10);

	setTimeout(() => {
		window.style.transition = "";
	}, 310);
};

function getWH(window) {    //获取当前活动窗口的width 和 height
	let toptitle = window.querySelectorAll(".title")[0];
	if (toptitle.style.width != "80%") {
		window.W = window.offsetWidth;
		window.H = window.offsetHeight;
	}
}
