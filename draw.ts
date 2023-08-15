let context = null;
const tileLength = 50;

let hero = new Image();
let enemy = new Image();
let princess = new Image();

let completed = false;
let killed = false;

let currentX = 0;
let currentY = 0;

let enemyX = 3;
let enemyY = 4;

const grid = [
  [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 0, 0, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 1, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
];

window.addEventListener("load", () => {
  const canvas = <HTMLCanvasElement>document.getElementById("game");
  context = canvas.getContext("2d");

  if (context == null) {
    return;
  }

  setupTile()
    .then(() => {
      setupHero();
      setupEnemy();
      setupPrincess();
    })
    .finally(() => {
      setInterval(() => {
        const direction = Math.floor(Math.random() * 3);
        switch (direction) {
          case 0:
            const tempL = enemyX - 1;
            if (tempL >= 0 && grid[enemyY][tempL] != 1) {
              resetEnemy();
              enemyX = tempL;
              moveEnemy();
            }
            break;
          case 1:
            const tempU = enemyY - 1;
            if (tempU >= 0 && grid[tempU][enemyX] != 1) {
              resetEnemy();
              enemyY = tempU;
              moveEnemy();
            }
            break;
          case 2:
            const tempR = enemyX + 1;
            if (tempR < 10 && grid[enemyY][tempR] != 1) {
              resetEnemy();
              enemyX = tempR;
              moveEnemy();
            }
            break;
          case 3:
            const tempD = enemyY + 1;
            if (tempD < 10 && grid[tempD][enemyY] != 1) {
              resetEnemy();
              enemyY = tempD;
              moveEnemy();
            }
            break;
        }
      }, 1000);
    });
});

const setupTile = async () => {
  grid.map((row: number[], rowIndex: number) => {
    row.map((col: number, colIndex: number) => {
      switch (col) {
        case 0:
          context.fillStyle = "#eeeeee";
          break;
        default:
          context.fillStyle = "#333333";
      }
      context.moveTo(colIndex, rowIndex);
      context.fillRect(
        colIndex * tileLength,
        rowIndex * tileLength,
        tileLength,
        tileLength
      );
      context.strokeStyle = "#222222";
      context.lineWidth = 0.5;
      context.strokeRect(
        colIndex * tileLength,
        rowIndex * tileLength,
        tileLength,
        tileLength
      );
    });
  });
};

const setupHero = () => {
  hero.src = "images/hero.png";
  hero.width = tileLength;
  hero.height = tileLength;

  hero.addEventListener("load", () => {
    {
      context.drawImage(
        hero,
        currentX * tileLength + 5,
        currentY * tileLength + 5,
        tileLength - 10,
        tileLength - 10
      );
    }
  });
};

const setupEnemy = () => {
  enemy.src = "images/enemy.png";
  enemy.width = tileLength;
  enemy.height = tileLength;

  enemy.addEventListener("load", () => {
    {
      context.drawImage(
        enemy,
        enemyX * tileLength + 5,
        enemyY * tileLength + 5,
        tileLength - 10,
        tileLength - 10
      );
    }
  });
};

const setupPrincess = () => {
  princess.src = "images/princess.png";
  princess.width = tileLength;
  princess.height = tileLength;

  princess.addEventListener("load", () => {
    {
      context.drawImage(
        princess,
        9 * tileLength + 5,
        9 * tileLength + 5,
        tileLength - 10,
        tileLength - 10
      );
    }
  });
};

const moveHero = () => {
  context.moveTo(currentX * tileLength, currentY * tileLength);
  context.drawImage(
    hero,
    currentX * tileLength + 5,
    currentY * tileLength + 5,
    tileLength - 10,
    tileLength - 10
  );

  if (currentX == enemyX && currentY == enemyY) {
    alert("Game over. You have failed to rescue the princess! OMG, now murdered.");
    window.location.reload();
  }
  if (currentX == 9 && currentY == 9) {
    alert("Thank you mario, you have rescued me!");
    window.location.reload();
  }
};

const moveEnemy = () => {
  context.moveTo(enemyX * tileLength, enemyY * tileLength);
  context.drawImage(
    enemy,
    enemyX * tileLength + 5,
    enemyY * tileLength + 5,
    tileLength - 10,
    tileLength - 10
  );

  if (currentX == enemyX && currentY == enemyY) {
    alert("Game over. You have failed to rescue the princess! OMG, now murdered.");
    window.location.reload();
  }
};

const resetCurrent = () => {
  context.fillStyle = "#eeeeee";
  context.moveTo(currentX, currentY);
  context.fillRect(
    currentX * tileLength,
    currentY * tileLength,
    tileLength,
    tileLength
  );
  context.strokeStyle = "#222222";
  context.lineWidth = 0.5;
  context.strokeRect(
    currentX * tileLength,
    currentY * tileLength,
    tileLength,
    tileLength
  );
};

const resetEnemy = () => {
  context.fillStyle = "#eeeeee";
  context.moveTo(enemyX, enemyY);
  context.fillRect(
    enemyX * tileLength,
    enemyY * tileLength,
    tileLength,
    tileLength
  );
  context.strokeStyle = "#222222";
  context.lineWidth = 0.5;
  context.strokeRect(
    enemyX * tileLength,
    enemyY * tileLength,
    tileLength,
    tileLength
  );
};

window.addEventListener("keyup", (e) => {
  e.preventDefault();
  switch (e.key) {
    case "ArrowLeft":
      const tempL = currentX - 1;
      if (tempL >= 0 && grid[currentY][tempL] != 1) {
        resetCurrent();
        currentX = tempL;
        moveHero();
      }
      break;
    case "ArrowUp":
      const tempU = currentY - 1;
      if (tempU >= 0 && grid[tempU][currentX] != 1) {
        resetCurrent();
        currentY = tempU;
        moveHero();
      }
      break;
    case "ArrowRight":
      const tempR = currentX + 1;
      if (tempR < 10 && grid[currentY][tempR] != 1) {
        resetCurrent();
        currentX = tempR;
        moveHero();
      }
      break;
    case "ArrowDown":
      const tempD = currentY + 1;
      if (tempD < 10 && grid[tempD][currentX] != 1) {
        resetCurrent();
        currentY = tempD;
        moveHero();
      }
      break;
  }
});
