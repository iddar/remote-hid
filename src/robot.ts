// Move the mouse across the screen as a sine wave.
import robot from 'robotjs'
 
// Speed up the mouse.
robot.setMouseDelay(2);
const screenSize = robot.getScreenSize();

console.log(screenSize)

export function moveMouse (position: {x: number, y: number}) {
  robot.moveMouse(position.x * screenSize.width, position.y * screenSize.height);
}

export const keyTap = robot.keyTap
export const mouseClick = robot.mouseClick
