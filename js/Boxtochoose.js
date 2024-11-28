function BonBoxtochoose(screen) {    
	screen = screen.querySelectorAll(".interface")[0];     
	let choosebox;
	let juedge = false;
	let startx, starty;

	screen.addEventListener("mousedown", (e) => {   //鼠标按下后准备开始绘制矩形
		if (e.button == 0) {
			if(!e.ctrlKey){
				for (let i = 0; i < appAll.length; i++) {
					clearapplight() 
					clearmenu()
				};
			}
			openmask();
			choosebox = document.createElement("div");
			choosebox.classList.add("choosebox");
			screen.appendChild(choosebox);
			
			juedge = true;
			startx = e.pageX;
			starty = e.pageY

			choosebox.style.left = startx + "px";
			choosebox.style.top = starty + "px";

		}
	})
	document.getRootNode().addEventListener("mousemove", (e) => {
		if (juedge) {
			let nowX = e.pageX,
				nowY = e.pageY;
			if (e.pageX > startx && e.pageY < starty) //第一象限
			{
				choosebox.style.top = e.pageY + "px";
				choosebox.style.left = startx + "px";

				choosebox.style.height = starty - nowY + "px"
				choosebox.style.width = Math.abs(startx - nowX) + "px"
			} else if (e.pageX < startx && e.pageY < starty) //第二象限
			{
				choosebox.style.top = e.pageY + "px";
				choosebox.style.left = e.pageX + "px";

				choosebox.style.height = Math.abs(starty - nowY) + "px"
				choosebox.style.width = Math.abs(startx - nowX) + "px"

			} else if (e.pageX < startx && e.pageY > starty) //第3象限
			{

				choosebox.style.left = e.pageX + "px";
				choosebox.style.top = starty + "px";

				choosebox.style.height = Math.abs(starty - nowY) + "px"
				choosebox.style.width = Math.abs(startx - nowX) + "px"
			} else if (e.pageX > startx && e.pageY > starty) //第4象限
			{

				choosebox.style.top = starty + "px";
				choosebox.style.left = startx + "px";

				choosebox.style.height = Math.abs(nowY - starty) + "px"
				choosebox.style.width = Math.abs(nowX - startx) + "px"
			}

			let appAll = contentAlldiv[nowpage].querySelectorAll(".app");   //获取所有app
			
			appAll.forEach(function(item) {    //进行框线的判断

				if (item.offsetLeft + item.offsetWidth >= choosebox.offsetLeft) { //右边线

					if (item.offsetLeft <= choosebox.offsetLeft + choosebox.offsetWidth) {
						//低边线
						if (item.offsetTop + item.offsetHeight >= choosebox.offsetTop) {
							//左边线
							if (item.offsetTop <= choosebox.offsetTop + choosebox.offsetHeight) {
								
									item.classList.add("light");
									item.mask=true;
								return;
							}
						}
					}
				}
			})
		}
	})
	document.getRootNode().addEventListener("mouseup", (e) => {
		if (juedge) {
			//移除框选
			let allchoosebox = document.querySelectorAll(".choosebox");
			allchoosebox.forEach((item) => {
				item.remove();
			})
			closemask();
			juedge = false;
		}
	});
}