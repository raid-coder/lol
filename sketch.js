let i, j, anglex = 0, angley = 0, anglez = 0;
let temp1, temp2;

function setup() {
  createCanvas(innerWidth, innerHeight);
  angleMode(DEGREES);
  points = [[-.5, -.5, -.5],
            [ .5, -.5, -.5],
            [ .5,  .5, -.5],
            [-.5,  .5, -.5],
            [-.5, -.5,  .5],
            [ .5, -.5,  .5],
            [ .5,  .5,  .5],
            [-.5,  .5,  .5],],
    lines = [],
    len = 8,
    nPoints = [];
    setLines();
}

function draw() {
  background(140, 50, 70);
  clonePoints();
  setrotx();
  setroty();
  setrotz();
  scal(100);
  transformToCentre();
  drawPoints();
  drawLines();
  checkforpoint();
  anglex+=1;
  angley+=1;
  anglez+=2;
}

function checkforpoint(){
  if (mouseIsPressed == true) {
    putpoint();
  }
}

function putpoint() {
  let x = (mouseX-width/2)/100;
  let y = (mouseY-height/2)/100;
  let z = 0;
  let t1 = x;
  let t2 = y;
  let ca = cos(anglez),
      sa = sin(-anglez),
      cb = cos(angley),
      sb = sin(-angley),
      cc = cos(anglex),
      sc = sin(-anglex);

  x = cb*(ca*x-sa*y)+sb*z
  y = cc*(sa*t1+ca*y)+sc*(sb*(ca*t1-sa*y)-cb*z)
  z = sc*(sa*t1+ca*t2)+cc*(-sb*(ca*t1-sa*t2)+cb*z)
  points.push([x,y,z]);
  len++;
}

function clonePoints(){
  nPoints = [];
  for(p of points){
    nPoints.push([p[0],p[1],p[2]]);
  }
}

function drawPoints(){
  strokeWeight(10);
  stroke(255)
  for(p of nPoints){
    point(p[0], p[1]);
  }
}

function scal(s){
  for(i=0;i<len;i++){
    for(j=0;j<3;j++){
      nPoints[i][j] *= s;
    }
  }
}

function transformToCentre(){
  for(i=0;i<len;i++){
    nPoints[i][0] += width/2;
    nPoints[i][1] += height/2;
  }
}

function setrotz(){
  for(i=0;i<len;i++){
    temp1 = nPoints[i][0];
    temp2 = nPoints[i][1];
    nPoints[i][0] = cos(anglez)*temp1 - sin(anglez)*temp2;
    nPoints[i][1] = sin(anglez)*temp1 + cos(anglez)*temp2;
  }
}

function setroty(){
  for(i=0;i<len;i++){
    temp1 = nPoints[i][0];
    temp2 = nPoints[i][2];
    nPoints[i][0] = cos(angley)*temp1 + sin(angley)*temp2;
    nPoints[i][2] = -sin(angley)*temp1 + cos(angley)*temp2;
  }
}

function setrotx(){
  for(i=0;i<len;i++){
    temp1 = nPoints[i][1];
    temp2 = nPoints[i][2];
    nPoints[i][1] = cos(anglex)*temp1 - sin(anglex)*temp2;
    nPoints[i][2] = sin(anglex)*temp1 + cos(anglex)*temp2;
  }
}

function setLines(){
  lines = [];
  for(i=0;i<4;i++){
    lines.push([i, (i+1)%4]);
    lines.push([i+4, (i+1)%4+4])
    lines.push([i, i+4]);
  }
}

function drawLines(){
  strokeWeight(4);
  stroke(0)
  for(l of lines){
    line(nPoints[l[0]][0], nPoints[l[0]][1], nPoints[l[1]][0], nPoints[l[1]][1])
  }
}