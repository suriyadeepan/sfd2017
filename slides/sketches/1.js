var circles = [];

// crate a class for Circle
function MCircle(x,y){
  // position
  this.x = x;
  this.y = y;
  
  // radius
  this.r = random(10,20);
  this.step = 0.01;
  // attach an oscillator
  this.osc = new p5.Oscillator();
  this.osc.setType('sine');
  
  // generate random frequency (60-2000 Hz)
  //  map (0, width) to (60-2000)
  var freq  = map(this.x, 0, width, 20, 2000);
  //this.rnd = Math.floor(random(60, 2000));
  this.osc.freq(freq); // set oscillator frequency
  this.osc.start();
  this.osc.amp(0,10); 
  
  // set color for rendering
  var r = map(this.x, 0, width, 0, 255);
  var g = map(this.y, 0, height, 0, 255);
  var b = 150; // TODO : make this depend on something
  
  this.color = color(r, g, b)
  
  // render circle
  this.render = function(){
      
    fill(this.color);
    ellipse(this.x, this.y, this.r*2, this.r*2);
    
  }
  
  // movement
  this.animate = function(){
  
    this.step++;
    this.y += this.step;
    
    // when the circle hits the ground
    if(this.y+ this.r >= height){
      // invert step (upward)
      this.step = -this.step;
      // set new random frequency
      //this.rnd = Math.floor(random(60, 2000));
      //this.osc.freq(this.rnd);
      this.osc.amp(0, this.r);
      this.r /= 1.2; // reduce radius
      
    }
    
  }
}

// mouse event response
function mouseReleased(){
  circles.push(new MCircle(mouseX, mouseY));
  
}

// init canvas
function setup(){
  createCanvas(windowWidth, windowHeight); 
  noStroke();
}

// loop
function draw(){
  // clear last frame
  background(245, 230);
  //background(color(
  // iterate through the list of cirlces
  //  [i]  render them
  //  [ii] animate them
  for(var i=0; i<circles.length; i++){
    circles[i].render();
    circles[i].animate();
    
    // stop oscillator for smaller circles
    if (circles[i].r < 5){
      circles[i].osc.stop();
    }
  }
  
  // remove small circles
  circles = circles.filter(function(x) {
    return x.r > 5;
  });

}
