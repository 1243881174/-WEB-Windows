function rightdown() {

	allmemu = document.querySelectorAll(".rightdown");
	if (allmemu.length != 0) return;
	let e = window.event;


	let rightdownDiv = document.createElement("div");

	rightdownDiv.classList.add("rightdown");

	rightdownDiv.style.left = e.pageX - 5 + "px"
	rightdownDiv.style.top = e.pageY - 5 + "px"

	rightdownDiv.addEventListener("mousemove", (e) => {
		e.stopPropagation();
	});
	
	
	for (let i in menudata) {
		rightdownDiv.innerHTML += `
			<div id="${menudata[i].id}">
				<div class="${menudata[i].className.toString()}">
				</div>
				<div>
					${menudata[i].text}
				</div>
				<div>
				</div>
			</div>
		`
	};
	contentAlldiv[nowpage].appendChild(rightdownDiv);
	
	
	rightdownDiv.querySelector("#open").onclick=function()
	{
		let allApp=contentAlldiv[nowpage].querySelectorAll(".interface .app");
		allApp.forEach((item)=>{
			if(item.mask)
			{
				creatappdow(item);
			}
		})
		clearapplight();
		clearmenu();
	}
	
	rightdownDiv.querySelector("#delete").onclick=function()
	{
		let allApp=contentAlldiv[nowpage].querySelectorAll(".interface .app");
		allApp.forEach((item)=>{
			if(item.mask)
			{
				item.remove();
			}
		})
		clearmenu();
	}
	rightdownDiv.querySelector("#restore").onclick=function()
	{
		let screenInterface=contentAlldiv[nowpage].querySelectorAll(".interface")[0];
		
		let clone=cloneMain_interface.cloneNode();
			clone.innerHTML=cloneMain_interface.innerHTML;
			
		screenInterface.innerHTML=clone.querySelectorAll(".interface")[0].innerHTML;
		appbon(contentAlldiv[nowpage]);
		clearmenu();
	}
	rightdownDiv.querySelector("#cancleArrange").onclick=function()
	{
		clearmenu();
	}
	rightdownDiv.querySelector("#autoArrange").onclick=function()
	{
		clearmenu();
	}
};

function clearmenu() {
	allmemu = document.querySelectorAll(".rightdown");
	allmemu.forEach((item) => {
		item.remove();
	});
};

function winset()    //home菜单
{
	let winmenu=foot.querySelectorAll(".winmenu")[0];
	for (let i in windata) {
		let winbox=document.createElement("div");
		winbox.className=windata[i].title;
		let div1=document.createElement("div");
		let div2=document.createElement("div");
		let div3=document.createElement("div");
		div1.className=windata[i].className.toString();
		div2.innerText=windata[i].text;
		div3.innerText="";
		winbox.appendChild(div1)
		winbox.appendChild(div2)
		winbox.appendChild(div3)
		
		winmenu.appendChild(winbox);
	};
	
}
function bonwinset(screen)
{
	
	screen.querySelectorAll(".removeallpage")[0].onclick=function()
	{
		contentAlldiv = $("content>div");
		for(let i=contentAlldiv.length-1;i>nowpage+1;i--)
		{
			contentAlldiv[i].remove();
		}
		contentAlldiv = $("content>div");
		notice("删除成功");
	}
}