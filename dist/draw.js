var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var context = null;
var tileLength = 50;
var hero = new Image();
var enemy = new Image();
var princess = new Image();
var completed = false;
var killed = false;
var currentX = 0;
var currentY = 0;
var enemyX = 3;
var enemyY = 4;
var grid = [
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
window.addEventListener("load", function () {
    var canvas = document.getElementById("game");
    context = canvas.getContext("2d");
    if (context == null) {
        return;
    }
    setupTile()
        .then(function () {
        setupHero();
        setupEnemy();
        setupPrincess();
    })["finally"](function () {
        setInterval(function () {
            var direction = Math.floor(Math.random() * 3);
            switch (direction) {
                case 0:
                    var tempL = enemyX - 1;
                    if (tempL >= 0 && grid[enemyY][tempL] != 1) {
                        resetEnemy();
                        enemyX = tempL;
                        moveEnemy();
                    }
                    break;
                case 1:
                    var tempU = enemyY - 1;
                    if (tempU >= 0 && grid[tempU][enemyX] != 1) {
                        resetEnemy();
                        enemyY = tempU;
                        moveEnemy();
                    }
                    break;
                case 2:
                    var tempR = enemyX + 1;
                    if (tempR < 10 && grid[enemyY][tempR] != 1) {
                        resetEnemy();
                        enemyX = tempR;
                        moveEnemy();
                    }
                    break;
                case 3:
                    var tempD = enemyY + 1;
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
var setupTile = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        grid.map(function (row, rowIndex) {
            row.map(function (col, colIndex) {
                switch (col) {
                    case 0:
                        context.fillStyle = "#eeeeee";
                        break;
                    default:
                        context.fillStyle = "#333333";
                }
                context.moveTo(colIndex, rowIndex);
                context.fillRect(colIndex * tileLength, rowIndex * tileLength, tileLength, tileLength);
                context.strokeStyle = "#222222";
                context.lineWidth = 0.5;
                context.strokeRect(colIndex * tileLength, rowIndex * tileLength, tileLength, tileLength);
            });
        });
        return [2 /*return*/];
    });
}); };
var setupHero = function () {
    hero.src = "images/hero.png";
    hero.width = tileLength;
    hero.height = tileLength;
    hero.addEventListener("load", function () {
        {
            context.drawImage(hero, currentX * tileLength + 5, currentY * tileLength + 5, tileLength - 10, tileLength - 10);
        }
    });
};
var setupEnemy = function () {
    enemy.src = "images/enemy.png";
    enemy.width = tileLength;
    enemy.height = tileLength;
    enemy.addEventListener("load", function () {
        {
            context.drawImage(enemy, enemyX * tileLength + 5, enemyY * tileLength + 5, tileLength - 10, tileLength - 10);
        }
    });
};
var setupPrincess = function () {
    princess.src = "images/princess.png";
    princess.width = tileLength;
    princess.height = tileLength;
    princess.addEventListener("load", function () {
        {
            context.drawImage(princess, 9 * tileLength + 5, 9 * tileLength + 5, tileLength - 10, tileLength - 10);
        }
    });
};
var moveHero = function () {
    context.moveTo(currentX * tileLength, currentY * tileLength);
    context.drawImage(hero, currentX * tileLength + 5, currentY * tileLength + 5, tileLength - 10, tileLength - 10);
    if (currentX == enemyX && currentY == enemyY) {
        alert("Game over. You have failed to rescue the princess!");
        window.location.reload();
    }
    if (currentX == 9 && currentY == 9) {
        alert("Thank you mario, you have rescued me!");
        window.location.reload();
    }
};
var moveEnemy = function () {
    context.moveTo(enemyX * tileLength, enemyY * tileLength);
    context.drawImage(enemy, enemyX * tileLength + 5, enemyY * tileLength + 5, tileLength - 10, tileLength - 10);
    if (currentX == enemyX && currentY == enemyY) {
        alert("Game over. You have failed to rescue the princess!");
        window.location.reload();
    }
};
var resetCurrent = function () {
    context.fillStyle = "#eeeeee";
    context.moveTo(currentX, currentY);
    context.fillRect(currentX * tileLength, currentY * tileLength, tileLength, tileLength);
    context.strokeStyle = "#222222";
    context.lineWidth = 0.5;
    context.strokeRect(currentX * tileLength, currentY * tileLength, tileLength, tileLength);
};
var resetEnemy = function () {
    context.fillStyle = "#eeeeee";
    context.moveTo(enemyX, enemyY);
    context.fillRect(enemyX * tileLength, enemyY * tileLength, tileLength, tileLength);
    context.strokeStyle = "#222222";
    context.lineWidth = 0.5;
    context.strokeRect(enemyX * tileLength, enemyY * tileLength, tileLength, tileLength);
};
window.addEventListener("keyup", function (e) {
    e.preventDefault();
    switch (e.key) {
        case "ArrowLeft":
            var tempL = currentX - 1;
            if (tempL >= 0 && grid[currentY][tempL] != 1) {
                resetCurrent();
                currentX = tempL;
                moveHero();
            }
            break;
        case "ArrowUp":
            var tempU = currentY - 1;
            if (tempU >= 0 && grid[tempU][currentX] != 1) {
                resetCurrent();
                currentY = tempU;
                moveHero();
            }
            break;
        case "ArrowRight":
            var tempR = currentX + 1;
            if (tempR < 10 && grid[currentY][tempR] != 1) {
                resetCurrent();
                currentX = tempR;
                moveHero();
            }
            break;
        case "ArrowDown":
            var tempD = currentY + 1;
            if (tempD < 10 && grid[tempD][currentX] != 1) {
                resetCurrent();
                currentY = tempD;
                moveHero();
            }
            break;
    }
});
