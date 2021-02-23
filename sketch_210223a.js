const Y_AXIS = 1;
const X_AXIS = 2;
let b1, b2, b3;
let c1, c2, c3;
let t1, t2 , t3;
let l1;

let r1, r2;
let o1, o2;
let g1, g2;
let cy1, cy2;

let cols, rows;
let scl = 60;
let w = 3600;
let h = 4200;

let scl02 = 40;
let w02 = 1600;
let h02 = 1200;


let flying = 0;
let terrain = [];

function setup() {
    createCanvas(400, 400, WEBGL);

    c1 = color(168, 189, 198);
    c2 = color(255, 183, 186);
    c3 = color(173, 119, 10);
    
    b1 = color(13,28, 33);
    b2 = color(13,28, 82);
    b3 = color(0, 168, 255);

    t1 = color(100, 247, 252);
    t2 = color(100, 240, 255);
    t3 = color(100, 100, 200);

    cy1 = color(50, 179, 237);
    cy2 = color(115, 222, 240);

    g1 = color(33, 234, 115);
    g2 = color(100, 245, 186);
    
    o1 = color(234, 201, 33);
    o2 = color(234, 225, 126);

    r1 = color(234, 33, 70);
    r2 = color(234, 78, 107);

    l1 = color(255, 85, 238);

    cols = w / scl;
    rows = h / scl;
    
    cols02 = w02 / scl02;
    rows02 = h02 / scl02;

    for (let x = 0; x < cols; x++) {
        terrain[x] = [];
        for (let y = 0; y < rows; y++) {
        terrain[x][y] = 0; //specify a default value for now
        }
    }

}


function draw() {
    push();
    translate(0, height * -0.3, width * -2);
    //setGradient(-width*2, -height*1.38, width * 4, height/1.2, cy1, cy2, cy1, Y_AXIS);
    //setGradient(-width*2, -height*0.55, width * 4, height/1.2, g1, g2, g1, Y_AXIS);
    //setGradient(-width*2, height*0.28, width * 4, height/1.2, o1, o2, o1, Y_AXIS);
    //setGradient(-width*2, height*1.1, width * 4, height/1.2, r1, r2, r1, Y_AXIS);

    //setGradient(-width*2,0, width * 4, height * 2, b3, b1, b1,Y_AXIS);
    setGradient(-width*2, height * -2 , width * 4, height * 4, b1, b2, b3, Y_AXIS);
    translate(0, height/2, 1);
    rotateZ(PI / 2);
    setCircle(-width * 0.4, 0, width * 2, b3, b2, b1);

    pop();


    push();  
    setTriangleShutter( width * -0.2 , 0, width * 0.4, g1, g2, b1);
    pop();


    push();
    translate(-800, -height * 0.5, height * -2);
    rotateX(radians(100));
    for (let y = 0; y < rows02 - 1; y++) {
            for (let x = 0; x < cols02; x++) {
            fill(b1);
            stroke(l1);
            rect(x*scl02, y*scl02, scl02, scl02);
            }
        }
    pop();


    push();
    translate(0, height * 0.2, 0 )
    rotateY(radians(35));
    rotateX(radians(65));
    setTriangle(0, 0, width* 0.3, width * 0.3, cy1, cy2, cy1);
    pop();  

    push(); 
    translate(width * -0.1, height *-0.1, 0)
    rotateX(radians(35));
    rotateY(radians(-140));
    rotateZ(radians(0));
    setTriangle(0, 0, width* 0.3, width * 0.3, r1,r2,r1);
    pop();  

    

    push(); 
    translate(width * 0.004, height *-0.25, 0)
    rotateX(radians(55));
    rotateY(radians(-45));
    rotateZ(radians(0));
    setTriangle(0, 0, width* 0.3, width * 0.3, o1,o2,o2);
    pop();  

    save("20210223.png");
    noLoop();

}

function setCircle(x, y, d, c1, c2, c3) {
 let c = 100;
 //circle(x,y,d);
 
 
 for (let i=0; i<c; i++) {
   let col = lerpColor(c1, c2, (i/c)*2 );
   let col02 = lerpColor(c2, c3, ((i - (c/2))/(c/2)));
   let a = lerp(PI, 0, i/c);
   
   if ( i <= c/2){
      fill(col);
      noStroke();
      arc(x, y, d, d, -a, a, CHORD);
    }else{
      fill(col02);
      noStroke();
      arc(x, y, d, d, -a, a, CHORD);
    }   

 }
}

function setGradient(x, y, w, h, c1, c2, c3, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, (y + h) - ((h/2)), 0, 1);
      let c = lerpColor(c1, c2, inter);
      
      let inter02 = map(i, (y + h) - ((h/2)) ,  y + h , 0, 1);
      let p = lerpColor(c2, c3, inter02);
      
      stroke(255);
      line(x, i, x + w, i);
      
      if ( i <= (y + h) - ((h/2))){
        stroke(c);
        line(x, i, x + w, i);
      }else{
        stroke(p);
        line(x, i, x + w, i);
      }
      
      
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x,(x + w) - (w/2), 0, 1);
      let c = lerpColor(c1, c2, inter);
      
      let inter02 = map(i, (x + w) - (w/2), x + w, 0, 1);
      let p = lerpColor(c2, c3, inter02);
      
      stroke(255);
      line(i, y, i, y + h);
      if ( i <= (x + w) - (w/2)){
        stroke(c);
        line(i, y, i, y + h);
      }else{
        stroke(p);
        line(i, y, i, y + h);
      }
      
    }
  }
}

function setTriangleShutter(x, y, h, c1, c2, c3 ){
  d = h;
  push();
  //translate( d * 0.2, d*0.2);
  for (let i = y; i <= y + d; i++) {
    let inter = map(i, y, (y + d) - (d/2), 0, 1);
    let c = lerpColor(c1, c2, inter);
    
    let inter02 = map(i, (y + d) - (d/2) ,  y + d , 0, 1);
    let p = lerpColor(c2, c3, inter02);
    
    //line( (x - i*0.5) + (d/2), i, (x + (d * 0.5)) + (i*0.5) , i);    
    if ( i <= (y + d) - (d/2)){
      stroke(c);
      
      
      if( i >= ( (y + d) -  (d * 0.6)) && i <= ( (y + d) -  (d * 0.5)) ){
         line( (x - i*0.5) + (d/2), i, (x + (d * 0.5)) + (i*0.5) , i)
       }
       
       if( i >= ( (y + d) -  (d * 0.7)) && i <= ( (y + d) -  (d * 0.62)) ){
         line( (x - i*0.5) + (d/2), i, (x + (d * 0.5)) + (i*0.5) , i)
       }
       
       if( i >= ( (y + d) -  (d * 0.77)) && i <= ( (y + d) -  (d * 0.72)) ){
         line( (x - i*0.5) + (d/2), i, (x + (d * 0.5)) + (i*0.5) , i)
       }
       
       if( i >= ( (y + d) -  (d * 0.82)) && i <= ( (y + d) -  (d * 0.79)) ){
         line( (x - i*0.5) + (d/2), i, (x + (d * 0.5)) + (i*0.5) , i)
       }
       
       if( i >= ( (y + d) -  (d * 0.86)) && i <= ( (y + d) -  (d * 0.84)) ){
         line( (x - i*0.5) + (d/2), i, (x + (d * 0.5)) + (i*0.5) , i)
       }
       
       if( i >= ( (y + d) -  (d * 0.9)) && i <= ( (y + d) -  (d * 0.88)) ){
         line( (x - i*0.5) + (d/2), i, (x + (d * 0.5)) + (i*0.5) , i)
       }
       
       if( i >= ( (y + d) -  (d * 0.92)) && i <= ( (y + d) -  (d * 0.91)) ){
         line( (x - i*0.5) + (d/2), i, (x + (d * 0.5)) + (i*0.5) , i)
       }
       
       if( i >= ( (y + d) -  (d * 0.94)) && i <= ( (y + d) -  (d * 0.93)) ){
         line( (x - i*0.5) + (d/2), i, (x + (d * 0.5)) + (i*0.5) , i)
       }
       
       if( i >= ( (y + d) -  (d * 0.96)) && i <= ( (y + d) -  (d * 0.95)) ){
         line( (x - i*0.5) + (d/2), i, (x + (d * 0.5)) + (i*0.5) , i)
       }
        
       if( i >= ( (y + d) -  (d * 0.98)) && i <= ( (y + d) -  (d * 0.97)) ){
         line( (x - i*0.5) + (d/2), i, (x + (d * 0.5)) + (i*0.5) , i)
       }
        
       if( i >= ( (y + d) -  (d * 1)) && i <= ( (y + d) -  (d * 0.99)) ){
         line( (x - i*0.5) + (d/2), i, (x + (d * 0.5)) + (i*0.5) , i)
       }
      
    }else{
      stroke(p);
      if(i >= ((y + d) - (d * 0.48)) && i <= ((y + d) - (d * 0.25)) ){
         line( (x - i*0.5) + (d/2), i, (x + (d * 0.5)) + (i*0.5) , i);
      }
      
      if (i >= ((y + d) - (d * 0.25)) && i <= ((y + d) - (d * 0.15))){
         line( (x - i*0.5) + (d/2), i, (x + (d * 0.5)) + (i*0.5) , i);
      }
      
      if (i >= ((y + d) - (d * 0.15)) && i <= (y + d)){
         line( (x - i*0.5) + (d/2), i, (x + (d * 0.5)) + (i*0.5) , i);
      }
    }
  }
}

function setTriangle(x, y, w, h, c1, c2, c3 ){
  
  push();
  stroke(l1);
  noFill();
  //triangle(x-1, y + h + 1, x+ w/2, y-1, x+w +1, y+h +1);
  pop();

  
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, (y + h) - (h/2), 0, 1);
    let c = lerpColor(c1, c2, inter);
    
    let inter02 = map(i, (y + h) - (h/2) ,  y + h , 0, 1);
    let p = lerpColor(c2, c3, inter02);
    stroke(c);
    //line( x - (i * 0.5) , y + i, x + h, y + i);  
    let m = x + (w/2); 
    let inc = (w/2)/h;
    
    if ( i <= (y + h) - (h/2)){
      stroke(c);
      line( (m - (i-y) * inc), i, (m + (i-y) * inc), i);
    }else{
      stroke(p);
      line( (m - (i-y) * inc), i, (m + (i-y) * inc), i);
    }
  }
  
}