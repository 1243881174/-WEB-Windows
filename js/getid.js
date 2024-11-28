function $(id) {
	return document.querySelectorAll(id);
}

function createEle(name) {
	return document.createElement(name);
}

function wait(a, time) {
	setTimeout(function() {
		a()
	}, time)
}
//时间实时同步
function refreshTime() {
	let date=new Date();
	let month=date.getMonth()+1;
	let year=date.getYear()+1900;
	let day=date.getDate();
	let hours=date.getHours();
	let minutes=date.getMinutes();
	let second=date.getSeconds()
	
	if(second<10) second="0"+second;
	if(minutes<10) minutes="0"+minutes;
	time=$(".time");
	
	for(let i=0;i<time.length;i++)
	{
		time[i].innerHTML=`${hours}:${minutes}:${second}<br>${year}/${month}/${day}`
	}
}

setInterval(function() {
	refreshTime()
}, 1000)
