var screenWidth = 640;
var screenHeight = 480;
var blobs = [];
var NUM_BLOBS = 200;
var DIST_LOW = 100;
var drawPoints = true;
var hueBase = 0;

function Blob(x, y, angle, speed){
  
  this.pos = createVector(x,y);
  this.direction = createVector(sin(angle), cos(angle));
  this.direction.normalize();
  this.speed = speed;
  
  // keep in bounds
  this._bound = function(){
    
    if(this.pos.x < 0){
      this.pos.x = 0;
      this.direction.x *= -1; // push in opposite direction
    } else if (this.pos.x > width){
      this.pos.x = width;
      this.direction.x *= -1;
    }
    
    if(this.pos.y < 0){
      this.pos.y = 0;
      this.direction.y *= -1; // push in opposite direction
    } else if (this.pos.y > height){
      this.pos.y = height;
      this.direction.y *= -1;
    }
    
  }
  
  this.animate = function(){
    this.pos.x += this.direction.x * this.speed;
    this.pos.y += this.direction.y * this.speed;
    
    // stay within canvas
    this._bound();
  }
  
  this.renderPoint = function(){
    noStroke();
    fill(255, 200);
    ellipse(this.pos.x, this.pos.y, 5, 5);
  }
  
  this.renderShape = function(){
    var proximalBlobs = [];
    
    // iterate through blobs
    for(var i=0; i<NUM_BLOBS; i++){
      var current = blobs[i];
      if (this == current){
        continue;
      }
      
      // distance between blobs[i], this
      var d = dist(this.pos.x, this.pos.y, current.pos.x, current.pos.y);
      // if within proximity
      //   add to proximal blobs list
      if (d < DIST_LOW){
        proximalBlobs.push(current);
      }
    }
    
    // if there are more than 3 proximal blobs
    if (proximalBlobs.length > 3){
      noStroke();
      var hue = hueBase + (proximalBlobs.length-3)*4;
      fill(hue, 255, 255, 50);
      
      // draw shape that connects all blobs in proximity of "this"
      beginShape();
      vertex(this.pos.x, this.pos.y);
      for(var j=0; j<proximalBlobs.length; j++){
        curveVertex(proximalBlobs[j].pos.x, proximalBlobs[j].pos.y);
      }
      endShape();  // weird shape ends here
    }
    
  } // end of _render_shape
  
}

// event listeners
function mousePressed(){
  // upon mouse press, pick a random hue value
  hueBase = random(0.0, 200.0);
}

function keyPressed(){
  // upon key press, toggle (enable/disable) drawPoints
  drawPoints = !drawPoints;
}


// init canvas
function setup(){
  createCanvas(windowWidth*0.7, windowHeight*0.7);
	translate(0.25 * width, 0.25 * height);
  background(0);
  // set HSB color mode, [max_value]
  colorMode(HSB, 255);
  
  // create a bunch of blobs
  for(var i=0; i<NUM_BLOBS; i++){
    blobs.push(new Blob(random(width), // x
                       random(height), // y
                       random(TWO_PI), // angle
                       random(0.5, 2) // speed
                       ));
  }

}

// loop
function draw(){
  
	translate(0.25 * width, 0.25 * height);
  // clear canvas
  background(0);
  // iterate through blobs
  for (var i=0; i<NUM_BLOBS; i++){
    blob = blobs[i];
    // animate blob
    blob.animate();
    // render shape
    blob.renderShape();
    
    // if drawPoints is enabled, draw points
    if (drawPoints){
      blob.renderPoint();
    }
  }
}

