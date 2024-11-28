function setsection(screen, window, app) {
	let section = screen.querySelectorAll(".section")[0];   //获取任务栏
	let div = document.createElement("div");

	div.id = appid++;     //appid为任务栏管理和窗口的绑定id
	let icon = app.querySelectorAll(".app>div")[0];   //获取当前活动app的图标
	div.className = icon.className;    //创建的dom元素赋予图标
	sectionlight(div);      //设置当前图标为高亮状态（表示活动，一次只有一个活动状态）
	
	div.onclick = function() {     //为当前任务栏图标绑定点击事件
		sections = section.querySelectorAll(".section>div");     
		for (let i = 0; i < sections.length; i++) {
			if (sections[i].id == window.id) {            
				sectionlight(sections[i]);               
				if (window.style.visibility == "visible") { 
					if (window.style.zIndex == index) {
						window.style.visibility = "hidden"
						sections.forEach(function(item) {
							item.classList.remove("light");
						})
					} else {                               
						window.style.zIndex = ++index;
					}

				} else {
					window.style.visibility = "visible"

					window.style.zIndex = ++index;
				}
				changeStyle(window);
				break;
			}
		}
	}
	
	section.appendChild(div);   //把dom元素加入到任务栏
}

function closesection(screen, window) {

	let allprogess = screen.querySelectorAll(".section>div");
	let section = screen.querySelectorAll(".section")[0];

	for (let i = 0; i < allprogess.length; i++) {
		if (allprogess[i].id == window.id) section.removeChild(allprogess[i]);
	}

}

function sectionlight(taskbar) {
	let alltask = contentAlldiv[nowpage].querySelectorAll(".section>div");
	alltask.forEach(function(item) {
		item.classList.remove("light");
	})
	taskbar.classList.add("light");
}
