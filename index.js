const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imagesrc: "./img/background.png",
});

// Player1

const player1 = new Figther({
  position: { x: 256, y: 100 },
  imagesrc: "./img/samurai/Idle.png",
  frameMax: 8,
  doubleHit: false,
  velocity: { x: 0, y: 0 },
  scale: 2.5,
  lastDirection: "right",
  grounded: true,
  offset: {
    x: 250,
    y: 165,
  },
  sprites: {
    idle: {
      imagesrc: "./img/samurai/Idle.png",
      frameMax: 8,
    },
    idleleft: {
      imagesrc: "./img/samurai/Idleleft.png",
      frameMax: 8,
    },

    run: {
      imagesrc: "./img/samurai/Run.png",
      frameMax: 8,
    },

    runleft: {
      imagesrc: "./img/samurai/Runleft.png",
      frameMax: 8,
    },

    jump: {
      imagesrc: "./img/samurai/Jump.png",
      frameMax: 2,
    },
    jumpleft: {
      imagesrc: "./img/samurai/Jumpleft.png",
      frameMax: 2,
    },

    fall: {
      imagesrc: "./img/samurai/Fall.png",
      frameMax: 2,
    },
    fallleft: {
      imagesrc: "./img/samurai/Fallleft.png",
      frameMax: 2,
    },
    attack1: {
      imagesrc: "./img/samurai/Attack1.png",
      frameMax: 6,
      hitFrame: 4,
    },
    attack1left: {
      imagesrc: "./img/samurai/Attack1left.png",
      frameMax: 6,
      hitFrame: 4,
    },
    attack2: {
      imagesrc: "./img/samurai/Attack2.png",
      frameMax: 6,
      hitFrame: 4,
    },
    attack2left: {
      imagesrc: "./img/samurai/Attack2left.png",
      frameMax: 6,
      hitFrame: 4,
    },
    takehit: {
      imagesrc: "./img/samurai/Take Hit.png",
      frameMax: 4,
    },
    takehitleft: {
      imagesrc: "./img/samurai/Takehitleft.png",
      frameMax: 4,
    },
    death: {
      imagesrc: "./img/samurai/Death.png",
      frameMax: 6,
    },
  },
  attackbox: {
    offset: {
      x: 90,
      y: 10,
    },
    width: 130,
    height: 100,
  },
});

// Opponent

const opponent = new Figther({
  position: { x: 656, y: 100 },
  imagesrc: "./img/monk/Idleleft.png",
  frameMax: 10,
  doubleHit: false,
  velocity: { x: 0, y: 0 },
  scale: 2.5,
  lastDirection: "left",
  grounded: true,
  offset: {
    x: 180,
    y: 65,
  },
  sprites: {
    idle: {
      imagesrc: "./img/monk/Idle.png",
      frameMax: 10,
    },
    idleleft: {
      imagesrc: "./img/monk/Idleleft.png",
      frameMax: 10,
    },

    run: {
      imagesrc: "./img/monk/Run.png",
      frameMax: 8,
    },
    runleft: {
      imagesrc: "./img/monk/Runleft.png",
      frameMax: 8,
    },

    jump: {
      imagesrc: "./img/monk/Jump.png",
      frameMax: 3,
    },
    jumpleft: {
      imagesrc: "./img/monk/Jumpleft.png",
      frameMax: 3,
    },

    fall: {
      imagesrc: "./img/monk/Fall.png",
      frameMax: 3,
    },
    fallleft: {
      imagesrc: "./img/monk/Fallleft.png",
      frameMax: 3,
    },
    attack1: {
      imagesrc: "./img/monk/Attack1.png",
      frameMax: 7,
      hitFrame: 5,
    },
    attack1left: {
      imagesrc: "./img/monk/Attack1left.png",
      frameMax: 7,
      hitFrame: 5,
    },
    attack2: {
      imagesrc: "./img/monk/Attack2.png",
      frameMax: 6,
      hitFrame: 3,
    },
    attack2left: {
      imagesrc: "./img/monk/Attack2left.png",
      frameMax: 6,
      hitFrame: 3,
    },
    takehit: {
      imagesrc: "./img/monk/Take Hit.png",
      frameMax: 3,
    },
    takehitleft: {
      imagesrc: "./img/monk/Take Hitleft.png",
      frameMax: 3,
    },
    death: {
      imagesrc: "./img/monk/Death.png",
      frameMax: 11,
    },
  },
  attackbox: {
    offset: {
      x: -180,
      y: 30,
    },
    width: 110,
    height: 100,
  },
});

// KeyBoard

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  k: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRigth: {
    pressed: false,
  },
};

window.addEventListener("keydown", (event) => {
  if (!player1.dead && timer > 0) {
    switch (event.key) {
      case "w":
        if (player1.grounded == true) {
          player1.velocity.y = -20;
          player1.grounded = false;
          setTimeout(() => {
            player1.grounded = true;
          }, 1000);
        }
        break;
      case "a":
        keys.a.pressed = true;
        //player1.attackbox.offset.x = -50
        player1.lastKey = "a";
        player1.attackbox.offset.x = -220;
        player1.lastDirection = "left";
        break;
      case "d":
        keys.d.pressed = true;
        //player1.attackbox.offset.x = 0
        player1.lastKey = "d";
        player1.attackbox.offset.x = 90;
        player1.lastDirection = "right";
        break;
      case "k":
        player1.attack();
        player1.doubleHit = true;
        break;
    }
  }
  // Opponent Keys
  if (!opponent.dead && timer > 0) {
    switch (event.key) {
      case "ArrowUp":
        if (opponent.grounded == true) {
          opponent.velocity.y = -20;
          opponent.grounded = false;
          setTimeout(() => {
            opponent.grounded = true;
          }, 1000);
        }
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        //opponent.attackbox.offset.x = -50
        opponent.lastKey = "ArrowLeft";
        opponent.attackbox.offset.x = -180;
        opponent.lastDirection = "left";
        break;
      case "ArrowRight":
        keys.ArrowRigth.pressed = true;
        //opponent.attackbox.offset.x = 0
        opponent.lastKey = "ArrowRight";
        opponent.attackbox.offset.x = 20;
        opponent.lastDirection = "right";
        break;
      case "0":
        opponent.attack();
        opponent.doubleHit = true;
        break;
    }
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }

  // Opponent Keys

  switch (event.key) {
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowRight":
      keys.ArrowRigth.pressed = false;
      break;
  }
});

function determineWinner(player1, opponent) {
  clearTimeout(timerId);
  document.querySelector("#displayText").style.display = "flex";

  if (player1.health === opponent.health) {
    document.querySelector("#displayText").innerHTML = "Tie";
  } else if (player1.health > opponent.health) {
    document.querySelector("#displayText").innerHTML = "Player 1 Wins";
    opponent.swichSprites("death");
  } else if (opponent.health > player1.health) {
    document.querySelector("#displayText").innerHTML = "Player 2 Wins";
    player1.swichSprites("death");
  }
}

//Timer
let timer = 61;
let timerId;

function runtimer() {
  if (timer > 0) {
    timerId = setTimeout(runtimer, 1000);
    timer--;
    document.querySelector("#timer").innerHTML = timer;
  }
  if (timer === 0) {
    determineWinner(player1, opponent, timerId);
  }
}

// Colisiones

function colision({ obj1, obj2 }) {
  return (
    obj1.attackbox.position.x + obj1.attackbox.width >= obj2.position.x &&
    obj1.attackbox.position.x <= obj2.position.x + obj2.width &&
    obj1.attackbox.position.y + obj1.attackbox.height >= obj2.position.y &&
    obj1.attackbox.position.y <= obj2.position.y + obj2.height
  );
}

function horizontalColision({ obj1 }) {
  return (
    obj1.position.x + obj1.width + obj1.velocity.x >= canvas.width ||
    obj1.position.x - obj1.width + obj1.velocity.x <= 0
  );
}

// Loop Animate

function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  player1.update();
  opponent.update();

  player1.velocity.x = 0;
  opponent.velocity.x = 0;

  // keyboar movement Player
  if (player1.lastDirection === "left") {
    if (keys.a.pressed) {
      player1.velocity.x = -5;
      player1.swichSprites("runleft");
    } else {
      player1.swichSprites("idleleft");
    }
    if (player1.velocity.y < 0) {
      player1.swichSprites("jumpleft");
    } else if (player1.velocity.y > 0) {
      player1.swichSprites("fallleft");
    }
  }

  if (player1.lastDirection === "right") {
    if (keys.d.pressed && player1.lastKey === "d") {
      player1.velocity.x = +5;
      player1.swichSprites("run");
    } else {
      player1.swichSprites("idle");
    }
    if (player1.velocity.y < 0) {
      player1.swichSprites("jump");
    } else if (player1.velocity.y > 0) {
      player1.swichSprites("fall");
    }
  }

  if (horizontalColision({ obj1: player1 })) {
    player1.velocity.x = 0;
  }

  // keyboar movement Opponent

  if (opponent.lastDirection === "left") {
    if (keys.ArrowLeft.pressed && opponent.lastKey === "ArrowLeft") {
      opponent.velocity.x = -5;
      opponent.swichSprites("runleft");
    } else {
      opponent.swichSprites("idleleft");
    }
    if (opponent.velocity.y < 0) {
      opponent.swichSprites("jumpleft");
    } else if (opponent.velocity.y > 0) {
      opponent.swichSprites("fallleft");
    }
  }
  if (opponent.lastDirection === "right") {
    if (keys.ArrowRigth.pressed && opponent.lastKey === "ArrowRight") {
      opponent.velocity.x = +5;
      opponent.swichSprites("run");
    } else {
      opponent.swichSprites("idle");
    }
    if (opponent.velocity.y < 0) {
      opponent.swichSprites("jump");
    } else if (opponent.velocity.y > 0) {
      opponent.swichSprites("fall");
    }
  }

  if (horizontalColision({ obj1: opponent })) {
    opponent.velocity.x = 0;
  }

  // Attack

  if (
    colision({ obj1: player1, obj2: opponent }) &&
    player1.attacking &&
    player1.framesCurrent === player1.hitFrame
  ) {
    opponent.takeHit();
    gsap.to("#player2HealthBar", { width: opponent.health + "%" });
  }
  if (player1.attacking && player1.framesCurrent === player1.hitFrame) {
    player1.attacking = false;
  }

  if (
    colision({ obj1: opponent, obj2: player1 }) &&
    opponent.attacking &&
    opponent.framesCurrent === opponent.hitFrame
  ) {
    player1.takeHit();
    gsap.to("#player1HealthBar", { width: player1.health + "%" });
  }
  if (opponent.attacking && opponent.framesCurrent === opponent.hitFrame) {
    opponent.attacking = false;
  }

  // Win

  if (player1.health <= 0 || opponent.health <= 0) {
    determineWinner(player1, opponent, timerId);
  }
}

animate();
runtimer();
