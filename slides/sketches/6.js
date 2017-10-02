var linesLow = 3;
var linesHigh = 25;
var radiusHigh;
var distLow;
var circles = [];
var zColor = null;
var NUM_CIRCLES = 8;

function Circle(){
  this.radius = random(radiusHigh);
  //this.x = random(-width/3, width/3);
  //this.y = random(-height/3, height/3);
  this.x = 0;
  this.y = 0;
  this.theta = 0;
  this.numLines = random(3, 25);
  
  if (random() < 0.5){
    this.rotateSpeed = random(0.005, 0.034);
  }  else{
    this.rotateSpeed = -random(0.005, 0.034);
  }
  
  if (random() < 0.5){
    this.radialSpeed = random(0.3, 1.4);
  }  else {
    this.radialSpeed = -random(0.3, 1.4);
  }
  
  this.update = function(){
    this.theta += this.rotateSpeed;
    this.radius += this.radialSpeed;
    if (Math.abs(this.radius) > radiusHigh){
      this.radialSpeed *= -1
    }
  }
}

function ZColor(){
  this.r = random(20, 255);
  this.g = random(20, 255);
  this.b = random(20, 255);
  // rate of change of color
  this.speedMin = 0.2;
  this.speedMax = 0.8;
  
  this.getRandSpeed = function(){
    var dir = 1;
    if(random() < 0.5){
      dir = -1;
    }
    return dir * random(this.speedMin, this.speedMax);
  };
  
  this.rSpeed = this.getRandSpeed();
  this.gSpeed = this.getRandSpeed();
  this.bSpeed = this.getRandSpeed();
  
  this.colorToggle = function(c, s){
    if ( c > 255 || c < 20 ){
      return -s;
    }
    return s;
  };
  
  this.update = function(){
    this.r += this.rSpeed;
    this.rSpeed = this.colorToggle(this.r, this.rSpeed);
    this.g += this.gSpeed;
    this.gSpeed = this.colorToggle(this.g, this.gSpeed);
    this.b += this.bSpeed;
    this.bSpeed = this.colorToggle(this.b, this.bSpeed);
  };
}

function connectCircles(c1, c2){
  var r1 = c1.radius;
  var r2 = c2.radius;
  var n1 = c1.numLines;
  var n2 = c2.numLines;
  // mapping min(r1, r2) to range (0.08, 1)
  var rCoeff = map(min(Math.abs(r1), Math.abs(r2)), 
                  0, radiusHigh,
                  0.08, 1);
  for (var i=0; i< n1; i++){
    // circle1.x + cosine_of { i out_of 2PI/n1 slices + circle1.theta}
    var x1 = c1.x + r1*cos( ((i* TWO_PI) / n1) + c1.theta );
    var y1 = c1.y + r1*sin( ((i* TWO_PI) / n1) + c1.theta );
    // iterate through num lines of circle2
    for (var j=0; j<n2; j++){
      var x2 = c2.x + r2*cos( ((j* TWO_PI) / n2) + c2.theta );
      var y2 = c2.y + r2*sin( ((j* TWO_PI) / n2) + c2.theta );
      
      // distance between (x1,y1), (x2,y2)
      d = dist(x1,y1,x2,y2);
      if (d < distLow){
        // set stroke Color
        stroke(zColor.r + r2/1.5,
              zColor.g + r2/2.2,
              zColor.b + r2/1.5,
              map(d, 0, distLow, 140, 0)*rCoeff); // alpha
        // draw line
        line(x1, y1, x2, y2);
      }
    }
  }
}

function initGraphics(){
  circles = [];
  for (var i=0; i< NUM_CIRCLES; i++){
    circles.push(new Circle());    
  }
  zColor = new ZColor();
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  frameRate(50);
  fill(0, 60);
  radiusHigh = min(width, height)/2;
  distLow = max(width, height)/3.5;
  initGraphics();
}

function draw(){
  noStroke();
  rect(0, 0, width, height);
  translate(width/2, height/2);
  zColor.update();
  
  for (var i=0; i<circles.length; i++){
    circles[i].update();
    for (var j = i+1; j < circles.length; j++){
      connectCircles(circles[i], circles[j]);
    }
  }
}

function mousePressed(){
	initGraphics(); 
}
