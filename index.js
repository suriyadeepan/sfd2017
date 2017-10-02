var NUM_PARTICLES = 170;
var particles = [];
var pool = [];
var thetaLow;
var thetaHigh;
var sizeLow = 5;
var sizeHigh = 180;
var wanderLow = 0.5;
var wanderHigh = 2;
var dampLow = 0.90;
var dampHigh = 0.99;
var forceLow = 2;
var forceHigh = 8;

// colors
var colorsLUT = [ '#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423' ];

function Particle(x, y, size){
	this.x = x;
	this.y = y;
	this.size = size || 10;

	this.alive = true;
	this.wander = 0.15;
	this.theta = random(TWO_PI);
	this.damp = 0.92;
	this.color = color(255, 255, 255);
	this.pos = createVector(this.x || 0.0, this.y || 0.0);
	this.vel = createVector(0, 0);

	this.update = function(){
		this.wander = random(wanderLow, wanderHigh);
		this.color = random(colorsLUT);
		this.damp = random(dampLow, dampHigh);
		this.theta = random(TWO_PI);
		force = random(forceLow, forceHigh);
		this.vel.x = cos(this.theta) * force; // TODO : recheck
		this.vel.y = sin(this.theta) * force;
	}

	this.animate = function(){
		// update position
		this.pos.add(this.vel);
		// dampen particle's velocity
		this.vel.mult(this.damp);
		// random angle
		this.theta = random(thetaLow, thetaHigh) * this.wander;
		// update velocity based on new theta
		this.vel.x += sin(this.theta) * 0.1;
		this.vel.y += cos(this.theta) * 0.1;
		// reduce size by 0.97
		this.size *= 0.97;
		this.alive = this.size > 0.5;
		}

	this.render = function(){
		fill(this.color);
		noStroke();
		ellipse(this.pos.x, this.pos.y, this.size, this.size);
	}

}

function spawnParticles(x, y){
	// pop out a particle from array
	//  if len of array exceeds bounds
	if (particles.length > NUM_PARTICLES){
		//pool.push(particles.shift());
		particles.shift();
	}

	// create new particle
	particle = new Particle(x, y,
			random(sizeLow, sizeHigh));

	// update particle's properties randomly	
	particle.update();
	particles.push(particle);

}

function update(){
	for (var i=particles.length -1; i>=0; i--){
		particle = particles[i];
		if (particle.alive){
			particle.animate();
		} else {
			particles.splice(i, 1);
		}

	}
}

function setup(){
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent('top');
	thetaLow = -PI/6;
	thetaHigh = PI/6;
}

function draw(){

	update();
	drawingContext.globalCompositeOperation = 'normal';
	background(10);
	drawingContext.globalCompositeOperation = 'lighter';
	for (var i=particles.length-1; i>=0; i--){
		particles[i].render();
	}
}


function mouseMoved(){
	for (var i=0; i< random(1,4); i++){
		spawnParticles(mouseX, mouseY);
	}
}

function keyPressed(){
	for (var i=0; i< random(1,100); i++){
		spawnParticles(width/2, height*0.3);
	}
}

function mouseWheel(){
	for (var i=0; i< random(1,4); i++){
		spawnParticles(0.25*width, 0.25*height);
	}
}
