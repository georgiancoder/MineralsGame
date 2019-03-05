window.onload = function(){

var gameInterval;
var mineralCreateInt;
var mineralchecker;
var bgInterval;
var canvas = document.getElementById('c2');
var canvas2 = document.getElementById('c');
var canvasbg = document.getElementById('bg');
var screenshot = document.getElementById('screenshot');
var ctxsh = screenshot.getContext('2d');
var ctx = canvas.getContext('2d');
var ctx2 = canvas2.getContext('2d');
var ctxbg = canvasbg.getContext('2d');

if(window.outerWidth <= 768){
	canvas.width = window.outerWidth;
	canvas.height = window.outerHeight;
	canvasbg.width = window.outerWidth;
	canvasbg.height = window.outerHeight;
	canvas2.width = window.outerWidth;
	canvas2.height = window.outerHeight;
}

var fps = 30;

// sounds
var pickup = new Audio('sounds/pickup.wav');


var bg = document.getElementById('bgimg');
var tree = document.getElementById('tree');
	var timerbg = document.getElementById('timerbg');
	var cloud1 = document.getElementById('cloud1');
	var cloud2 = document.getElementById('cloud2');
	var chiti1 = document.getElementById('chiti1');
	var chiti2 = document.getElementById('chiti2');
	var snowboarder = document.getElementById('snowboarder');
	var liderboard = document.getElementById('liderboard');

	var timesup = document.getElementById('timesup');
	var b = document.getElementById('b');
	var qulebi = document.getElementById('qulebi');
	var popup = document.getElementById('popup');
	var scoreico = document.getElementById('score');

	
	var sulfatebi = document.getElementById('sulfatebi');
	var qlorid = document.getElementById('qlorid');
	var hydrokarbonat = document.getElementById('hydrokarbonat');
	var natrium = document.getElementById('natrium');
	var kalium = document.getElementById('kalium');
	var magnium = document.getElementById('magnium');
	var kalcium = document.getElementById('kalcium');

	var timeenc = document.getElementById('timeenc');
	var timedec = document.getElementById('timedec');

	var double = document.getElementById('x2');
	var minusdouble = document.getElementById('mx2');


var nextlvlbtn = document.getElementById('nextLevel');
var minerals = [];

var scores = 0;
var timer = 30;
var level = 1;

var level1 = [sulfatebi,qlorid,hydrokarbonat];
var level2 = [sulfatebi,qlorid,hydrokarbonat,natrium,kalium];
var level3 = [sulfatebi,qlorid,hydrokarbonat,natrium,kalium,magnium,kalcium];


function cleateMinerals(){
	mineralCreateInt = setInterval(function(){
var startCoords = [];
var endCoords = [];
var endX = 0;
var endY = 0;
var startSide = Math.round(Math.random() * 3);
var endSide = Math.round(Math.random() * 3);
while(endSide == startSide){
	endSide = Math.round(Math.random() * 3);
}

startCoords = setXY(startSide);


endCoords = setXY(endSide);
var currentMineral;
var mineralscore = 1;
var x2 = 0;
	switch(level){
		case 1:
			currentMineral = level1[Math.round(Math.random() * (level1.length - 1))];
			currentMineral.time = 0;
			mineralscore = currentMineral.getAttribute('data-score');
		break;
		case 2:
			currentMineral = level2[Math.round(Math.random() * (level2.length - 1))];
			var timeencdec = Math.round(Math.random() * 50);
			if(timeencdec == 30){
				currentMineral.time = 3;
			}else if(timeencdec == 37){
				currentMineral.time = -3;
			}
			else{
				currentMineral.time = 0;
			}
			mineralscore = currentMineral.getAttribute('data-score');
		break;
		case 3:
			currentMineral = level3[Math.round(Math.random() * (level3.length - 1))];
			mineralscore = currentMineral.getAttribute('data-score');
			var timeencdec = Math.round(Math.random() * 50);
			if(timeencdec == 30){
				// time encrizer
				currentMineral.time = 3;
			}else if(timeencdec == 37){
				// time decrizer
				currentMineral.time = -3;
			}else if(timeencdec == 32){
				// x2
				mineralscore = parseInt(mineralscore) + parseInt(mineralscore);
				x2 = 1;
			}
			else if(timeencdec == 21){
				// -x2
				mineralscore -= (parseInt(mineralscore) * 2);	
				x2 = -1;
			}
			else{
				currentMineral.time = 0;
			}

		break;
	}
		minerlaname = currentMineral.getAttribute('data-name');
		

var speedoflight = 1 + Math.floor(Math.random() * 3);

	var mineral = new Mineral(
					{
						name: minerlaname,
						width: 50,
						height: 50,
						sprite: currentMineral,
						score: mineralscore,
						time: currentMineral.time,
						x: startCoords[0],
						y: startCoords[1],
						deleted: false,
						x2: x2,
						speed: speedoflight
					});
	minerals.push(mineral);
},300);

}


function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {

    if (arguments.length === 2) {
        x = y = 0;
        w = ctx.canvas.width;
        h = ctx.canvas.height;
    }

    // default offset is center
    offsetX = typeof offsetX === "number" ? offsetX : 0.5;
    offsetY = typeof offsetY === "number" ? offsetY : 0.5;

    // keep bounds [0.0, 1.0]
    if (offsetX < 0) offsetX = 0;
    if (offsetY < 0) offsetY = 0;
    if (offsetX > 1) offsetX = 1;
    if (offsetY > 1) offsetY = 1;

    var iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r,   // new prop. width
        nh = ih * r,   // new prop. height
        cx, cy, cw, ch, ar = 1;

    // decide which gap to fill
    if (nw < w) ar = w / nw;
    if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
    nw *= ar;
    nh *= ar;

    // calc source rectangle
    cw = iw / (nw / w);
    ch = ih / (nh / h);

    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;

    // make sure source rectangle is valid
    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih;

    // fill image in dest. rectangle
    ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
}

function makeScreenshot(){
	try{
		ctxsh.drawImage(canvasbg,0,0,screenshot.width,screenshot.height);
	ctxsh.drawImage(canvas,0,0,screenshot.width,screenshot.height);
	ctxsh.drawImage(canvas2,0,0,screenshot.width,screenshot.height);

	var generatedImg = screenshot.toDataURL();
	var image = new Image();
	image.src = generatedImg;
	image.width = '100';
	document.body.appendChild(image);
	}catch(e){
		console.log(e);
	}
}

function Mineral(options){
	this.name = options.name;
	this.width = options.width;
	this.height = options.height;
	this.sprite = options.sprite;
	this.score = options.score;
	this.time = options.time;
	this.x = options.x;
	this.y = options.y;
	this.speed = options.speed;
	this.currX = this.x;
	this.currY = this.y;
	this.deleted = options.deleted,
	this.x2 = (options.x2) ? options.x2 : 0
}

function setXY(side){
	var x = 0;
	var y = 0;
	switch(side){
		case 0:
		x = 50 + Math.random() * (canvas.width - 100);
		y = 0;
		break;
		case 1:
		x = canvas.width - 50;
		y = 50 + Math.random() * (canvas.height - 100);
		break;
		case 2:
		x = 50 + Math.random() * (canvas.width - 100);
		y = canvas.height - 50;
		break;
		case 3:
		x = 0;
		y = 50 + Math.random() * (canvas.height - 100);
		break;
	}
	return [x,y];
}

function clear(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
}


function score(){
	ctx.beginPath();
	ctx.fillStyle = "#f58634";
	ctx.fillRect(130,40,90,50);
	ctx.font = "30px Cataclysmo";
	ctx.fillStyle = "#373435";
	ctx.textAlign = "center";
	ctx.fillText(scores,175,75);
	ctx.closePath();
}

function draw(){
	clear();	
	if(minerals.length > 0){
		for(i=0; i<minerals.length; i++){
			if(!minerals[i].deleted){
				ctx.drawImage(minerals[i].sprite, minerals[i].currX,minerals[i].currY,50,50);
				if(minerals[i].time > 0){
					ctx.beginPath();
					ctx.drawImage(timeenc,minerals[i].currX + 35, minerals[i].currY + 5,25,25);
					ctx.closePath();
				}else if(minerals[i].time < 0){
					ctx.beginPath();
					ctx.drawImage(timedec,minerals[i].currX + 35, minerals[i].currY + 5,25,25);
					ctx.closePath();
				}

				if(minerals[i].x2 == 1){
					ctx.beginPath();
					ctx.drawImage(double,minerals[i].currX + 35, minerals[i].currY + 5,25,25);
					ctx.closePath();
				}else if(minerals[i].x2 == -1){
					ctx.beginPath();
					ctx.drawImage(minusdouble,minerals[i].currX + 35, minerals[i].currY + 5,25,25);
					ctx.closePath();
				}
				if(minerals[i].x > canvas.width/2 && minerals[i].x > 0){
					minerals[i].currX-=minerals[i].speed;
				}
				else{
					minerals[i].currX+=minerals[i].speed;
				}
				if(minerals[i].y > canvas.height/2 && minerals[i].y > 0){
					minerals[i].currY-=minerals[i].speed;
				}
				else{
					minerals[i].currY+=minerals[i].speed;
				}
			}
			else{
				if(minerals[i].vaja && minerals[i].vaja >= 0){
					minerals[i].vaja-=2;
					ctx.fillStyle= '#373435';
					ctx.font = '30px Cataclysmo';
					var score = (minerals[i].score > 0) ? '+ ' + minerals[i].score : minerals[i].score;
					ctx.fillText(score,minerals[i].currX,minerals[i].currY - 10);

						ctx.drawImage(minerals[i].sprite, minerals[i].currX + (50 - minerals[i].vaja),minerals[i].currY + (50 - minerals[i].vaja),50 - (50 - minerals[i].vaja),50 - (50 - minerals[i].vaja));
				}

			}
		}
	}
}

function startbackground(){
	// drawImageProp(ctxbg,bg,0,0,canvasbg.width,canvasbg.height);
	ctxbg.drawImage(bg,0,0,canvasbg.width,canvasbg.height);
	ctxbg.drawImage(tree,0,canvasbg.height - tree.height);
}

startbackground();

cloud1x = 100;
cloud1y = 100;
snowboarderx = canvasbg.width+20;
snowboardery = canvasbg.height/2;
var snbdiffx = Math.abs((canvasbg.width-150) - (canvasbg.width-20));
var snbdiffy = (canvasbg.height/2 + 200) - (canvasbg.height/2); 
var mda = false;
var chiti1x = -200;
var chiti2x = -100;


function gamebackground(){
	ctxbg.clearRect(0,0,canvasbg.width,canvasbg.height);
	// drawImageProp(ctxbg,bg,0,0,canvasbg.width,canvasbg.height);
	ctxbg.drawImage(bg,0,0,canvasbg.width,canvasbg.height)
	ctxbg.drawImage(cloud1,cloud1x,cloud1y);
	ctxbg.drawImage(cloud2,cloud1x + 450,cloud1y + 30);
	ctxbg.drawImage(snowboarder, snowboarderx,snowboardery);
	ctxbg.drawImage(chiti1,chiti1x, 250);
	ctxbg.drawImage(chiti2,chiti2x, 250);
	ctxbg.drawImage(tree,0,canvasbg.height - tree.height);
	if(cloud1x == 200){
		mda = true;
	}
	if(cloud1x == 100){
		mda = false;
	}
	if(snowboarderx)
	if(mda){
		cloud1x--;
	}
	else
	{
		cloud1x++;
	}

	if(snowboardery > canvasbg.height){
		snowboarderx = canvasbg.width+20;
		snowboardery = canvasbg.height/2;
	}else{
		snowboarderx--;
		snowboardery+=(snbdiffy / snbdiffx);
	}

	if(chiti1x < canvasbg.width + 20){
		chiti1x+=1.5;
	}else if(chiti1x >= canvasbg.width + 20){
		chiti1x = -200;
	}

	if(chiti2x < canvasbg.width + 20){
		chiti2x++;
	}else if(chiti2x >= canvasbg.width + 20){
		chiti2x = -100;
	}

}

function startGame(){
	bgInterval = setInterval(function(){
		gamebackground();
	},50);
	timeri();
	cleateMinerals();
	mineralchecker = setInterval(function(){
	timeri();
},1000);
	gameInterval = setInterval(function(){
		switch(level){
			case 1:
			level01();
			break;
			case 2:
			level02();
			break;
			case 3:
			level03();
			break;
		}
	},fps);
}

function level01(){
	if(timer >= 0){
		draw();
		score();
	}else{
		clearInterval(gameInterval);
		clearInterval(mineralCreateInt);
		clearInterval(mineralchecker);
		clearInterval(bgInterval);
		clear();
		ctx2.clearRect(0,0,canvas2.width,canvas2.height);
		minerals = [];

		qulebi.innerHTML = '<span>' + scores + '</span>';

		nextlvlbtn.setAttribute('class','show');
		timesup.setAttribute('class','show');
		b.setAttribute('class','show');	
		scoreico.setAttribute('class','show');
	}
}

function level02(){
	if(timer >= 0){
		draw();
		score();
	}else{
		clearInterval(gameInterval);
		clearInterval(mineralCreateInt);
		clearInterval(mineralchecker);
		clearInterval(bgInterval);
		clear();
		ctx2.clearRect(0,0,canvas2.width,canvas2.height);
		minerals = [];
		

		qulebi.innerHTML = '<span>' + scores + '</span>';

		nextlvlbtn.setAttribute('class','show');
		timesup.setAttribute('class','show');
		b.setAttribute('class','show');
		scoreico.setAttribute('class','show');
	}
}

nextlvlbtn.addEventListener('click',function(){

			nextlvlbtn.removeAttribute('class');
			timesup.removeAttribute('class');
			b.removeAttribute('class');
			scoreico.removeAttribute('class');
			level++;
			timer = 30;
			fps = 40 - level * 10;
			startGame();
		},false);

function level03(){
	if(timer >= 0){
		draw();
		score();
	}else{
		clearInterval(gameInterval);
		clearInterval(mineralCreateInt);
		clearInterval(mineralchecker);
		clearInterval(bgInterval);
		// makeScreenshot();
		clear();
		ctx2.clearRect(0,0,canvas2.width,canvas2.height);
		minerals = [];
		

		qulebi.innerHTML = '<span>' + scores + '</span>';
		timesup.setAttribute('class','show');
		b.setAttribute('class','show');
		popup.setAttribute('class','show');
		scoreico.setAttribute('class','show');
	}
}

function timeri(){
	if(timer > 0){
		ctx2.clearRect(0,0,canvas2.width,canvas2.height);
	// timer bg
	ctx2.drawImage(timerbg,15,15,100,100);

	//timer animated bg
	var timepercent = timer / 30 * 100;
	drawPercentageCircle(timepercent,20);

	// text bg
	ctx2.beginPath();
	ctx2.fillStyle = "#00afef";
	ctx2.arc(65,65,25,0,2.5*Math.PI);
	ctx2.fill();
	ctx2.closePath();

	// timer text
	ctx2.font = "25px Cataclysmo";
	ctx2.fillStyle = "#FFF";
	ctx2.textAlign = "center";
	ctx2.fillText(timer,65,65);
	// sec
	ctx2.font = "15px Cataclysmo";
	ctx2.fillText('SEC',65,80);
	timer--;
	}else if(timer ==0){
		ctx2.clearRect(0,0,canvas2.width,canvas2.height);
	// timer bg
	ctx2.drawImage(timerbg,15,15,100,100);

	//timer animated bg
	var timepercent = timer / 30 * 100;
	drawPercentageCircle(timepercent,20);

	// text bg
	ctx2.beginPath();
	ctx2.fillStyle = "#00afef";
	ctx2.arc(65,65,25,0,2.5*Math.PI);
	ctx2.fill();
	ctx2.closePath();

	// timer text
	ctx2.font = "25px Cataclysmo";
	ctx2.fillStyle = "#FFF";
	ctx2.textAlign = "center";
	ctx2.fillText(timer,65,65);
	// sec
	ctx2.font = "15px Cataclysmo";
	ctx2.fillText('SEC',65,80);
		timer--;
	}
}


function degreesToRadians(deg) {
return (deg/180) * Math.PI;
}
function percentToRadians(percentage) {
// convert the percentage into degrees
var degrees = percentage * 360 / 100;
// and so that arc begins at top of circle (not 90 degrees) we add 270 degrees
return degreesToRadians(degrees + 270);
}

function drawPercentageCircle(percentage, radius) {
  var startAngle = percentToRadians(0);
  var endAngle = percentToRadians(percentage);
  // set to true so that we draw the missing percentage
  var counterClockwise = true;
  ctx2.strokeStyle = 'lightyellow';
  ctx2.stroke();
  // set to false so that we draw the actual percentage
  counterClockwise = false;
  ctx2.beginPath();
  ctx2.arc(65, 65, radius, startAngle, endAngle, counterClockwise);
  ctx2.lineWidth = 20;
  // line color
  ctx2.strokeStyle = '#52dfd1';
  ctx2.stroke();
  }

canvas.addEventListener('click',collectMinerals,false);

function collectMinerals(e){
	var clicked = false;
	for(i in minerals){
		if(!minerals[i].deleted &&  e.offsetX >= minerals[i].currX && e.offsetX <= (minerals[i].currX + 50) && e.offsetY >= minerals[i].currY && e.offsetY <= (minerals[i].currY + 50)){
			clicked = true;
			minerals[i].deleted = true;
			scores+=Number(minerals[i].score);
			timer += Number(minerals[i].time);
			minerals[i].vaja = 50;
			pickup.currentTime = 0;
			pickup.play();
			break;
		}
	}

}


canvas.addEventListener('touchstart',function(e){
	var clicked = false;
	for(i in minerals){
		if(!minerals[i].deleted &&  e.touches[0].clientX >= minerals[i].currX && e.touches[0].clientX <= (minerals[i].currX + 50) && e.touches[0].clientY >= minerals[i].currY && e.touches[0].clientY <= (minerals[i].currY + 50)){
			clicked = true;
			minerals[i].deleted = true;
			scores+=Number(minerals[i].score);
			timer += Number(minerals[i].time);
			minerals[i].vaja = 50;
			pickup.currentTime = 0;
			pickup.play();
			break;
		}
	}
},false);

scoreico.addEventListener('click',function(){
	if(liderboard.className == 'show'){
		liderboard.removeAttribute('class');
		timesup.setAttribute('class','show');
		b.setAttribute('class','show');
		if(level != 3){
			nextlvlbtn.setAttribute('class','show');
		}
		if(level == 3){
			popup.setAttribute('class','show');
		}
	}else{
		liderboard.setAttribute('class','show');
		if(level == 3){
			popup.removeAttribute('class');
		}
		if(level != 3){
			nextlvlbtn.removeAttribute('class');
		}

		nextlvlbtn.removeAttribute('class');
		timesup.removeAttribute('class');
		b.removeAttribute('class');
	}
},false);

var startbtn = document.getElementById('startgame');
startbtn.addEventListener('click',function(){
	this.style.display = 'none';
	startGame();
},false)

}