var timeout;
var duration;

var now;
var pause;
var alarm;


var alarmSound = new Audio("alert.mp3");


function setAlarm(time){
    duration = time;
    ringIn(time);
}


function ringIn(time){
    clearTimeout(timeout);
    pause = null;
    
    var secs = time % 60;
    var mins = parseInt(time / 60);
    var hours = parseInt(mins /60);
    mins = mins % 60;
    
    alarm = new Date();
    
    alarm.setHours(alarm.getHours() + hours);
    alarm.setMinutes(alarm.getMinutes() + mins);
    alarm.setSeconds(alarm.getSeconds() + secs);
    alarm.setMilliseconds(alarm.getMilliseconds() +500);
    
    now = new Date();
    
    timeout = setTimeout(ring, alarm.getTime() - now.getTime());
    
    chrome.browserAction.setBadgeBackgroundColor({color:[76, 187, 23, 255]});
	setInterval(function() {
		chrome.browserAction.setBadgeText({text: getTimetoString(getTimeLeft())});
	}, 1000);
}

function paused(){
    isPause = true;
    pause = new Date();
    clearTimeout(timeout);
    now = null;
    chrome.browserAction.setBadgeBackgroundColor({color:[250, 150, 0, 255]});
    console.log("pause!");
}

function resume(){
    var remain = (alarm.getTime() - pause.getTime()) / 1000;
    ringIn(remain);
}

function stop(){
    clearTimeout(timeout);
	duration = 0;
	alarm = null;
    pause = null;
    now = null;
    chrome.browserAction.setBadgeText({text: ""});
}

function reset(){
    ringIn(duration);
}

function ring(){
   var options = {
      type: "basic",
      title: "Timer",
      message: "Time\'s up!",
      iconUrl: "icon.png",
      priority: 2
   }
   chrome.notifications.create("", options);

   alarmSound.play();
	stop();
}


function getTimeLeft(){
    if(pause){
        return (alarm.getTime() - pause.getTime());
    }
    else {
        var current = new Date();
        return (alarm.getTime() - current.getTime());
    }
}

function getTimetoString(){
    var time = getTimeLeft();
    var tSecs = parseInt(time / 1000);
	var tMins = parseInt(tSecs / 60);
	var secs = tSecs % 60;
	var hour = parseInt(tMins / 60);
	var mins = tMins % 60;
    
     hour = hour < 10 ? "0" + hour : hour;
     mins = mins < 10? "0" + mins : mins;
     secs = secs < 10 ? "0" + secs : secs;
    
    return hour + ":" + mins + ":" + secs;
}


