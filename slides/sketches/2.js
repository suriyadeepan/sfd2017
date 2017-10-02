var nodes = [];
var NUM_NODES = 130;
var DIST_LOW = 100;
var SPRING_CONSTANT = 0.001;

function Node(){
 
  // constant radius
  this.radius = 8;
  // set location
  this.x = random(width);
  this.y = random(height);
  
  // velocity
  this.vx = random()*6 - 3;
  this.vy = random()*6 - 3;
  
  this.update = function(){
    this.x += this.vx;
    this.y += this.vy;
    
    if(this.x > width){
      this.x = 0;
    } else if (this.x < 0){
      this.x = width;
    }
    
    if(this.y > height){
      this.y = 0;
    } else if(this.y < 0){
      this.y = height;
    }
    
  };
  
  // draw node here
  this.render = function(){
    // set color
    fill(255,255,255);
    // draw circle
    ellipse(this.x, this.y, this.radius);
  };
  
}

function createNodes(n){
  var nodes = [];
  for(var i=0;i<n;i++){
    nodes.push(new Node());
    nodes[i].render();
  }
  return nodes;
}

function setup(){
  // create canvas
  createCanvas(0.7 * windowWidth, 0.7 * windowHeight);
	translate(0.25*width, 0.25*height);
  // set bg
  background(0);
  // create nodes
  nodes = createNodes(NUM_NODES);
  
  frameRate(50);
}

function draw(){
  
	translate(0.25*width, 0.25*height);
  // set bg every frame
  background(0);
  
  // iterate through frames
  for(i=0;i<nodes.length;i++){
    nodes[i].update();
    nodes[i].render();
    
    // work on current node
    var node = nodes[i];
    for(var j=i+1; j<NUM_NODES; j++){
      var next = nodes[j];
      // distance b/w node and next
      //var d = Math.abs(dist(node.x, node.y, next.x, next.y))
      var dx = node.x - next.x;
      var dy = node.y - next.y;
      var d = Math.sqrt(dx*dx + dy*dy);
      
      if (d<DIST_LOW){
        // calculate alpha value
        var alpha = (1-(d/DIST_LOW))*255
        //console.log(alpha)
        // draw line connecting node and next
        stroke(255,255,255, alpha);
        strokeWeight(2);
        line(node.x, node.y, next.x, next.y);

        // recalculate velocity
        var ax = dx * SPRING_CONSTANT;
        var ay = dy * SPRING_CONSTANT;
        node.vx += ax;
        node.vy += ay;
        next.vx -= ax;
        next.vy -= ay;
      }
    }
  }
}
