var bgpage = chrome.extension.getBackgroundPage();
var refreshTimeout;


function getTime(){
    var hour = document.getElementById('hour').value;
    if( isNaN(hour) ){
        hour = 0;
    }
    var minute = document.getElementById('minute').value;
    if( isNaN(minute) ){
        minute = 0;
    }
    var second = document.getElementById('second').value;
    if(isNaN(second)){
        second = 0;
    }
    var time = hour * 60 * 60 + minute * 60 + second * 1;
    console.log(time);
    return time;
}

function show(id){
    document.getElementById(id).style.display = "inline";
}

function hide(id){
    document.getElementById(id).style.display = "none";
}
 
document.addEventListener('DOMContentLoaded', function () {
    load();
    document.querySelector('#start').addEventListener('click', setTimer);
    document.querySelector('#pause').addEventListener('click', pauseTimer);
    document.querySelector('#stop').addEventListener('click', stop);
    document.querySelector('#reset').addEventListener('click', reset);
    document.querySelector('#resume').addEventListener('click', resume);
    document.querySelector('#hour').addEventListener('click', select);
    document.querySelector('#minute').addEventListener('click', select);
    document.querySelector('#second').addEventListener('click', select);
});

function select(){
    this.select();
}
    
function load(){
    
   

	if(!bgpage.alarm)
	{
        show("setting");
		show("start");
        hide("pause");
        hide("stop");
        hide("resume");
	}
	
	else
	{
        hide("setting");
        hide("start");
        show("pause");
        show("stop");
        show("reset");
        refresh();
	}
    if(bgpage.pause)
    {
        show("resume");
        hide("pause");
    }
}


function setTimer(){

      var time = getTime();
      bgpage.setAlarm(time);
      hide("setting");
      hide("start");
      show("pause");
      show("stop");
      show("reset");
      refresh();
}


function refresh(){
    document.getElementById('up').textContent = bgpage.getTimetoString();
    refreshTimeout = setTimeout(refresh,100);
}


function pauseTimer()
{
    hide("pause");
    show("resume");
    bgpage.paused();
    clearTimeout(refreshTimeout);
}

function resume(){
    hide("resume");
    show("pause");
    refresh();
    bgpage.resume();
}

function stop()
{
	clearTimeout(refreshTimeout);
	bgpage.stop();
	hide("stop");
	show("start");
    show("setting");
	hide("pause");
    hide("resume");
    hide("reset");
    document.getElementById('hour').value = "00";
    document.getElementById('minute').value = "00";
    document.getElementById('second').value = "00";
    document.getElementById('up').textContent = "";
}

function reset()
{
    show("pause");
    hide("start");
    hide("resume");
    refresh();
    bgpage.reset();
    
}

