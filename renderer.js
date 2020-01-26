let lines = [];
let t = 0;
let graphPoints = [];
// Default Speed and No. of harmonics
let BASE_FREQ = 0.05; 
let harmonicsCount = 10;

function polarLine({x,y,r,ang}) {
	let x2 = x - r*sin(ang);
	let y2 = y - r*cos(ang);
	
	line(x,y,x2,y2);
	return {x:x2,y:y2}; 
}

function drawLines() {
	stroke(255);
	let x = 250, y = 250;
	let res = {x,y};
	lines.forEach((l,i) => {
		let {A,f,ph} = l;
		res = polarLine({x,y,r:A,ang:f*t + (ph||0)});
		x = res.x; y = res.y;
	});
	graphPoints.push({x:t,y});
	fill(255,0,0);
	circle(res.x, res.y, 7);
	stroke(255,0,0);
	line(res.x,res.y,250,res.y);
	
}

function drawGraphPoints() { 
	stroke(200,200,200);
    graphPoints.forEach(p => {
		point(250 - t + p.x,p.y);
	});
	for (let i = 0; i < graphPoints.length-1; i++) {
		let p1 = graphPoints[i]; 
		let p2 = graphPoints[i+1];
		line(250 - t + p1.x,p1.y, 250 - t + p2.x, p2.y);
	}
	
    if (graphPoints.length > 250) {
   	    graphPoints.splice(0,1); 
    }
}

function resetGraph() {
	lines = [];
	graphPoints = [];
	t = 0;
}

function setup() {
	createCanvas(500, 500).parent('canvas');
	stroke(255);
	squareWave(harmonicsCount);
	
}

function drawAxisLabels() {
	textFont('Helvetica');
	textSize(14);
	push();
	stroke(255, 51, 0); // Red
	strokeWeight(2);
	line(480,480,480,430);
	translate(475,460);
	rotate(-Math.PI/2);
	strokeWeight(0.5);
	text("Re",0,0);
	pop();
	stroke(51, 153, 255); // Blue
	fill(51,153,255);
	strokeWeight(2);
	line(480,480,430,480)
	strokeWeight(0.5);
	text("Im",445,475);
	strokeWeight(1.5);
}

function draw() {
	background(0);
	stroke(255);
	drawAxisLabels();
	drawLines();	
    drawGraphPoints();
    t++;
}