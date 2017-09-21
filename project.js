//All code written by Kyle Weinert for use in this script only.
var count = 0;
var count2 = null;
var scaleSet = true;
var frameRate = 15;
var markArray = [];
var calcScale = 1;
var data = [];
var num1A = [];
var num2A = [];
var timeA = [];
var xVelA = [];
var yVelA = [];
var countA = [];
var scaleMarks = [];
var x1 = null;
var x2 = null;
var x3 = null;
var y1 = null;
var y2 = null;
var y3 = null;
var mark1 = null;
var mark2 = null;
var origin = null;
var originX = 0;
var originY = 0;
$(document).ready(function() {
  $("#clickBox").click(function(e){
    newMark(e);
  });
});

var newMark = function(e){
  info = e;
  count2++;
  x3 = x2;
  y3 = y2;
  x2 = x1;
  y2 = y1;
  x1 = info.pageX - $('#clickBox').offset().left;
  y1 = 600 - (info.pageY - $('#clickBox').offset().top);
  //$(coords2).hide();
  setMark();
  appendSheet();
  nextFrame();
};

var setMark = function() {
  mark2 = mark1;
  mark = $("<span>").css({
    'position': 'absolute',
    'background-color': '#ff0000',
    'border-radius': '6px',
    'width': '6px',
    'height': '6px',
    top: info.pageY - $('#clickBox').offset().top - 5,
    left: info.pageX - $('#clickBox').offset().left - 5
  });
  mark1 = mark;
  markArray.push(mark);
};

var setScale = function() {
  //player.seekTo(0);
  scaleMarks.length = 0;
  scaleMarks.push(mark.css({'background-color': '#00ff00'}));
  scaleMarks.push(mark2.css({'background-color': '#00ff00'}));
  oldScale = calcScale;
  if(x1, y1, x2, y2 !== null){
    enteredScale = prompt("Distance between two points in m:");
    enteredScale = enteredScale.replace(/[^\d.-]/g,'');
    if (enteredScale === null) {
      alert("You must enter a value to change the scale.");
    } else{
      //distance = math.distance([(x1 * calcScale), (y1 * calcScale)], [(x2 * calcScale), (y2 * calcScale)]);
      distance = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
      //distance = math.distance([x1, y1], [x2, y2]);
      calcScale = distance / enteredScale;
      console.log(distance);
      console.log(calcScale);
      //clearData();
      undo();
      undo();
      scaleSet = true;
      loadData();
    }
  }else{
    alert("To set scale, two points must be placed.");
  }
};

var appendSheet = function(){
	//num1 = ((info.pageX - $('#clickBox').offset().left - 5) / calcScale).toFixed(3);
  //num2 = ((info.pageY - $('#clickBox').offset().top - 5) / calcScale).toFixed(3);
  num1A.push(x1 - originX);
  num2A.push(y1 - originY);
  timeA.push(player.getCurrentTime());
  xVelA.push(((x1 - x2) / (Math.abs(timeA[timeA.length - 1] - timeA[timeA.length - 2]))));
  yVelA.push(((y1 - y2) / (Math.abs(timeA[timeA.length - 1] - timeA[timeA.length - 2]))));
  //coord1 = $("<tr><td>" + num1 + "</td><td>" + num2 + "</td><td>" + time + "</td></tr>");
  //data.push(coord1);
  loadData();
};

function loadData(){
  clearSheet();
  clearMarks();
  for(var i = 0; i < timeA.length; i++){
    /*num1 = (num1A[i]).toFixed(3);
    num2 = (num2A[i]).toFixed(3);
    time = (timeA[i]).toFixed(3);
    xVel = (xVelA[i]).toFixed(3);
    yVel = (yVelA[i]).toFixed(3);*/
    count++;
    countA.push(count);
    num1 = (num1A[i] / calcScale).toFixed(3);
    num2 = (num2A[i] / calcScale).toFixed(3);
    time = (timeA[i]).toFixed(3);
    xVel = (xVelA[i] / calcScale).toFixed(3);
    yVel = (yVelA[i] / calcScale).toFixed(3);
  	if(timeA === []){
  	  $("#content").append($("<tr><td>" + countA[i] + "</td><td>" + num1 + "</td><td>" + num2 + "</td><td>" + time + "</td><td>" + "null" + "</td><td>" + "null" + "</td></tr>"));
  	}else{
  	  $("#content").append($("<tr><td>" + countA[i] + "</td><td>" + num1 + "</td><td>" + num2 + "</td><td>" + time + "</td><td>" + xVel + "</td><td>" + yVel + "</td></tr>"));
  	}
  	$("div#marks").append(markArray[i]);
  	for(var p = 0; p < scaleMarks.length; p++){
  	  $("div#mainMarks").append(scaleMarks[i]);
  	}
  	$("div#mainMarks").append(origin);
  	console.log(markArray.length);
  }
}

function nextFrame() {
  player.pauseVideo();
  currentTime = player.getCurrentTime();
  timeToPlay = (1/frameRate);
  newTime = currentTime + timeToPlay;
  player.seekTo(newTime);
}

function previousFrame() {
  player.pauseVideo();
  currentTime = player.getCurrentTime();
  timeToPlay = (1/frameRate);
  newTime = currentTime - timeToPlay;
  player.seekTo(newTime);
}

function loadVideo(){
  var url = prompt("Enter video URL or video ID below:");
  videoId = url.substr(url.length-11, url.length-1);
  
  if(videoId === null){
    alert("You must enter a URL to change the video.");
  }else{
    player.loadVideoById(videoId);
  }
}

function startTime(){
  time = prompt("Enter prefered time in seconds:");
  time = time.replace(/[^\d.-]/g,'');
  if(time === null){
    alert("To change the time you must enter a value.");
  }else{
    player.seekTo(time);
  }
}

function getTime(){
  player.getCurrentTime();
}

function clearData(){
  $("#content tr").remove();
  data.length = 0;
  num1A.length = 0;
  num2A.length = 0;
  timeA.length = 0;
  xVelA.length = 0;
  yVelA.length = 0;
  markArray.length = 0;
  countA.length = 0;
  count = 0;
  $("#marks span").remove();
}

function clearSheet(){
  $("#content tr").remove();
}

function clearMarks(){
  $("#marks span").remove();
  $("#mainMarks span").remove();
}

function setTime(){
  frames = prompt("Enter new frame rate");
  frames = frames.replace(/[^\d.-]/g,'');
  if(frames === null){
    alert("You must enter a new frame rate in order to change it.");
  }else{
    frameRate = frames;
  }
}

function undo(){
  num1A.pop();
  num2A.pop();
  timeA.pop();
  xVelA.pop();
  yVelA.pop();
  countA.pop();
  count--;
  count2--;
  x1 = x2;
  y1 = y2;
  x2 = x3;
  y2 = y3;
  x3 = null;
  y3 = null;
  loadData();
  previousFrame();
  markArray.pop();
}

function copyText() {
    //Before we copy, we are going to select the text.
    var text = document.getElementById(content);
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
    //add to clipboard.
    document.execCommand('copy');
}

function instructions(){
  $("#instructions").toggle();
}

function setOrigin(){
  origin = mark1.css({'background-color': '#ffff00'});
  if(x1 === null){
    alert("You must first set a point.");
  }else{
    originX = num1A[num1A.length - 1];
    originY = num2A[num2A.length - 1];
    undo();
    for(var i = 0; i < num1A.length; i++){
      num1A[i] -= originX;
      num2A[i] -= originY
    }
    loadData();
  }
}

function removeMark(){
  rMark = prompt("Which point would you like to remove?");
  countA.pop();
  num1A.splice(rMark - 1, 1);
  num2A.splice(rMark - 1, 1);
  timeA.splice(rMark - 1, 1);
  xVelA.splice(rMark - 1, 1);
  yVelA.splice(rMark - 1, 1);
  markArray.splice(rMark - 1, 1);
  count--;
  count2--;
  loadData();
}

function restartVideo(){
  player.seekTo(0);
}