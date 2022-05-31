const CONTAINER = document.querySelector('#grid-container');
const RESIZE = document.querySelector('#resize-btn');
const CLEAR = document.querySelector('#clear-btn');

let gridSize = 16;
let response = '';
let itemList = [...document.querySelectorAll('.grid-item')]; //spread to transform nodelist into array to access .map

//resizes grid based on user input
let resizeGrid = () => {
  deleteGrid();
  captureResponse();
  createGrid();
};

//clear color from grid
let clearGrid = () => {
  deleteGrid();
  createGrid();
};

//prompt when resizing grid, set response.
let captureResponse = () => {
  parseInt(
    (gridSize = prompt(
      'How big would you like the grid? Please keep it less than 100.'
    ))
  );
  if (response >= 100) {
    captureResponse();
  }
};

//removes all cells from grid
let deleteGrid = () => {
  let n = gridSize * gridSize;
  while (n > 0) {
    let gridItem = document.querySelector('.grid-item');
    CONTAINER.removeChild(gridItem);
    n--;
  }
};

//creates the grid based on input. Defaults to 16x16.
let createGrid = () => {
  document.documentElement.style.setProperty(`--size`, `${gridSize}`);
  let n = gridSize * gridSize;
  while (n > 0) {
    const GRID = document.createElement('div');
    GRID.classList.add('grid-item');
    CONTAINER.appendChild(GRID);
    GRID.addEventListener('mouseenter', (event) => colorTiles(event));
    n--;
  }
};

//color the hovered tile or darken it if it already has color
let colorTiles = (event) => {
  let tileColor = event.target.style.backgroundColor;

  if (tileColor == '') {
    setColor(event);
  } else {
    darkenColor(event);
  }
};

//sets hovered tile to random color
let setColor = (event) => {
  let randomHue = Math.floor(Math.random() * 255);
  event.target.style.backgroundColor = `hsl(${randomHue},100%, 50%)`;
};

//reduces the lightness of a current tile by 5%. Tile should be black after 10 hovers.
let darkenColor = (event) => {
  let tileColor = event.target.style.backgroundColor;
  let rgbInts = tileColor.match(/(\d+)/g); //RGB conversion
  let r = rgbInts[0];
  let g = rgbInts[1];
  let b = rgbInts[2];

  let hue = rgbToHue(r, g, b);
  let lightness = rgbToLightness(r, g, b) - 5;
  let darkenColor = `hsl(${hue}, 100%, ${lightness}%)`;
  event.target.style.backgroundColor = darkenColor;
};

//convert rgb to ue
let rgbToHue = (r, g, b) => {
  return Math.round(
    (Math.atan2(Math.sqrt(3) * (g - b), 2 * r - g - b) * 180) / Math.PI
  );
};

//convert rgb to lightness
let rgbToLightness = (r, g, b) => {
  return (((1 / 2) * (Math.max(r, g, b) + Math.min(r, g, b))) / 255) * 100;
};

window.onload = () => {
  createGrid(16);
  RESIZE.addEventListener('click', resizeGrid);
  CLEAR.addEventListener('click', clearGrid);
};
