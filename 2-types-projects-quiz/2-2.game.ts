/**
 * Let's make a game 🕹
 */

type Direction = 'up' | 'down' | 'left' | 'right';

let position = { x: 0, y: 0 };
function Move(direction: Direction): void {
  switch (direction) {
    case 'up':
      position.y++;
      break;
    case 'down':
      position.y--;
      break;
    case 'left':
      position.x--;
      break;
    case 'right':
      position.x++;
      break;
    default:
      throw new Error(`unknown direction: ${direction}`);
  }
}

console.log(position); // { x: 0, y: 0}
Move('up');
console.log(position); // { x: 0, y: 1}
Move('down');
console.log(position); // { x: 0, y: 0}
Move('left');
console.log(position); // { x: -1, y: 0}
Move('right');
console.log(position); // { x: 0, y: 0}
