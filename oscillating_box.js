function init() {
  console.log("in init function");
  canvas = document.getElementById("mycanvas");
  W = canvas.width = 500;
  canvas.height = 500;

  // canvas object is used to draw graphics
  pen = canvas.getContext("2d");
  pen.fillStyle = "red";
  game_over = false;

  rect = {
    x: 20,
    y: 20,
    w: 40,
    h: 40,
    speed: 20,
  };
}

function draw() {
  //   console.log("in draw");
  pen.clearRect(0, 0, 500, 500);
  pen.fillRect(rect.x, rect.y, rect.w, rect.h);
}

function update() {
  //   console.log("in upadte");
  rect.x += rect.speed;
  if (rect.x > W - rect.w || rect.x < 0) {
    rect.speed = -1 * rect.speed;
  }
}

function gameloop() {
  console.log("in gameloop");
  draw();
  update();
  if (game_over == true) {
    // used to stop setInterval ie stop infinite gameloop
    clearInterval(f);
    console.log("GAME OVER");
  }
}

init();

// call draw and update functions again and again
// at a gap of 100ms
var f = setInterval(gameloop, 100);
