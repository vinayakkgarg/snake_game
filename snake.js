function init() {
  console.log("in init function");

  canvas = document.getElementById("mycanvas");
  W = H = canvas.width = canvas.height = 1000;
  game_over = false;
  pen = canvas.getContext("2d");
  cell_size = 67;
  score = 5;

  food = getRandomFood();

  // create img object for food
  food_img = new Image();
  food_img.src =
    "/home/vinayakk/real_life_DS/snakes_game_oops/images/apple.png";

  trophy = new Image();
  trophy.src = "/home/vinayakk/real_life_DS/snakes_game_oops/images/trophy.png";

  snake = {
    intial_length: 5,
    color: "blue",
    cells: [],
    direction: "right",

    createSnake: function () {
      for (var i = this.intial_length; i > 0; i--) {
        this.cells.push({ x: i, y: 0 });
      }
    },

    drawSnake: function () {
      for (var i = 0; i < this.cells.length; i++) {
        pen.fillStyle = this.color;
        pen.fillRect(
          this.cells[i].x * cell_size,
          this.cells[i].y * cell_size,
          cell_size - 2,
          cell_size - 2
        );
      }
    },

    updateSnake: function () {
      console.log("updating snake according to direction");

      // check if snake eaten food
      // increase the length of snake
      // generate new food object

      // get coordinates of head of snake
      var headX = this.cells[0].x;
      var headY = this.cells[0].y;

      if (headX == food.x && headY == food.y) {
        console.log("food eaten");
        score++;
        food = getRandomFood();
      } else {
        // delete last element of array
        this.cells.pop();
      }

      var nextX, nextY;

      if (this.direction == "right") {
        nextX = headX + 1;
        nextY = headY;
      } else if (this.direction == "left") {
        nextX = headX - 1;
        nextY = headY;
      } else if (this.direction == "down") {
        nextX = headX;
        nextY = headY + 1;
      } else {
        nextX = headX;
        nextY = headY - 1;
      }

      // add a block to front of array
      this.cells.unshift({ x: nextX, y: nextY });

      // logic to keep snake within boundary
      var last_x = Math.round(W / cell_size);
      var last_y = Math.round(H / cell_size);

      if (
        this.cells[0].y < 0 ||
        this.cells[0].x < 0 ||
        this.cells[0].x > last_x ||
        this.cells[0].y > last_y
      ) {
        game_over = true;
      }
    },
  };

  snake.createSnake();

  function keyPressed(e) {
    if (e.key == "ArrowRight") {
      snake.direction = "right";
    } else if (e.key == "ArrowLeft") {
      snake.direction = "left";
    } else if (e.key == "ArrowDown") {
      snake.direction = "down";
    } else {
      snake.direction = "up";
    }
    console.log(snake.direction);
  }

  //add even listener on document
  document.addEventListener("keydown", keyPressed);
}

function draw() {
  // erase old frame
  pen.clearRect(0, 0, W, H);
  snake.drawSnake();

  pen.fillStyle = "red";
  pen.drawImage(
    food_img,
    food.x * cell_size,
    food.y * cell_size,
    cell_size,
    cell_size
  );

  pen.drawImage(trophy, 20, 20);

  pen.fillStyle = "blue";
  pen.font = "40px Roboto";
  pen.fillText(score, 55, 60);
}

function update() {
  snake.updateSnake();
}

function getRandomFood() {
  var foodX = Math.round((Math.random() * (W - cell_size)) / cell_size);
  var foodY = Math.round((Math.random() * (H - cell_size)) / cell_size);

  var food = {
    x: foodX,
    y: foodY,
    color: "red",
  };

  return food;
}

function gameloop() {
  if (game_over == true) {
    alert("game over");
    clearInterval(f);
  }
  draw();
  update();
}

init();

var f = setInterval(gameloop, 100);
