import chalk from "chalk";

import type { Color, Cube } from "./cube.ts";

const STICKER = "[ ]";

export function draw(cube: Cube): void {
  const PADDING = " ".repeat(10);

  // Print Up face (indices 36-44)
  for (let row = 0; row < 3; row++) {
    process.stdout.write(PADDING);
    printFaceRow(cube, 36, row);
    process.stdout.write("\n");
  }
  process.stdout.write("\n"); // Blank line separator

  // Print Left, Front, Right, Back faces
  for (let row = 0; row < 3; row++) {
    printFaceRow(cube, 27, row); // Left (27-35)
    process.stdout.write(" ");
    printFaceRow(cube, 0, row); // Front (0-8)
    process.stdout.write(" ");
    printFaceRow(cube, 18, row); // Right (18-26)
    process.stdout.write(" ");
    printFaceRow(cube, 9, row); // Back (9-17)
    process.stdout.write("\n");
  }
  process.stdout.write("\n"); // Blank line separator

  // Print Down face (indices 45-53)
  for (let row = 0; row < 3; row++) {
    process.stdout.write(PADDING);
    printFaceRow(cube, 45, row);
    process.stdout.write("\n");
  }
}

// Helper to print a row of a face
function printFaceRow(cube: Cube, faceStartIndex: number, row: number) {
  const index = faceStartIndex + row * 3;
  printSticker(cube[index]!);
  printSticker(cube[index + 1]!);
  printSticker(cube[index + 2]!);
}

function printSticker(color: Color) {
  let coloredSticker: string;
  switch (color) {
    case "Blue": {
      coloredSticker = chalk.bgAnsi256(21).black(STICKER);
      break;
    }
    case "Green": {
      coloredSticker = chalk.bgAnsi256(46).black(STICKER);
      break;
    }
    case "Orange": {
      coloredSticker = chalk.bgAnsi256(208).black(STICKER);
      break;
    }
    case "Red": {
      coloredSticker = chalk.bgAnsi256(196).black(STICKER);
      break;
    }
    case "White": {
      coloredSticker = chalk.bgAnsi256(231).black(STICKER);
      break;
    }
    case "Yellow": {
      coloredSticker = chalk.bgAnsi256(226).black(STICKER);
      break;
    }
  }
  process.stdout.write(coloredSticker);
}
