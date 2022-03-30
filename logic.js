const CONTAINER = document.querySelector('#grid-container');
const RESET = document.querySelector('#reset-btn');

let gridSize = 16;

//INPUT: Click reset button
//OUTPUT: Select all items in grid. Remove color class. Prompt to resize grid. Call resizeGrid with new size.

let resetGrid = () => {
  let itemList = document.querySelectorAll('.grid-item');
  itemList = [...itemList]; //spread to transform nodelist into array to access .map
  itemList.map(item => item.classList.remove('fill'));
  response = prompt(
    'How big would you like the grid? Please keep it less than 100.'
  );
  if (response >= 100) {
    resetGrid();
  }
  let n = gridSize * gridSize;
  while (n > 0) {
    let gridItem = document.querySelector('.grid-item');
    CONTAINER.removeChild(gridItem);
    n--;
  }
  gridSize = parseInt(response);
  resizeGrid(gridSize);
};

let resizeGrid = gridSize => {
  document.documentElement.style.setProperty(`--size`, `${gridSize}`);
  console.log('resize');
  console.log(gridSize);
  let n = gridSize * gridSize;
  while (n > 0) {
    const GRID = document.createElement('div');
    GRID.classList.add('grid-item');
    CONTAINER.appendChild(GRID);
    GRID.addEventListener('mouseenter', event => {
      let item = event.target;
      let newColor = Math.floor(Math.random() * 255);
      if (item.style.backgroundColor == '') {
        let existingColor = `hsl(${newColor},100%, 50%)`;
        item.style.backgroundColor = existingColor;
      } else {
        let digits = item.style.backgroundColor.match(/(\d+)/g);
        let r = digits[0];
        let g = digits[1];
        let b = digits[2];

        //convert rgb to hue
        let hue = Math.round(
          (Math.atan2(Math.sqrt(3) * (g - b), 2 * r - g - b) * 180) / Math.PI
        );

        //convert rgb to lightness
        let lightness =
          (((1 / 2) * (Math.max(r, g, b) + Math.min(r, g, b))) / 255) * 100 - 5;
        console.log(lightness);

        let darkenColor = `hsl(${hue}, 100%, ${lightness}%)`;
        item.style.backgroundColor = darkenColor;
      }
    });
    n--;
  }
};

RESET.addEventListener('click', resetGrid);

resizeGrid(16);
