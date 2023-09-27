const tilesContainer = document.querySelector('.tiles');
const colors = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "pink",
  "white"
];
const colorsList = [...colors, ...colors];
const tileCount = colorsList.length;

let revealedCount = 0;
let activeTile = null;
let awaitingEnd = false;

function tileBuild(color) {
  const element = document.createElement('div');
  element.classList.add('card');
  element.setAttribute('data-color', color);
  element.setAttribute('data-revealed', "false");
  element.addEventListener('click', function() {
  const revealed = element.getAttribute('data-revealed')

    if (awaitingEnd || revealed === 'true' || element === activeTile) {
      return;
    };

    element.style.backgroundColor = color;
    if (!activeTile) {
      activeTile = element;
      return;
    };

    const match = activeTile.getAttribute('data-color')

    if (match === color) {
      activeTile.setAttribute('data-revealed', 'true');
      element.setAttribute('data-revealed', 'true');
      awaitingEnd = false;
      activeTile = null;
      revealedCount += 2;

      if (revealedCount === tileCount) {
        alert("You Win!");
      }
      return;
    
    }

    awaitingEnd = true;

    setTimeout(() => {
      element.style.backgroundColor = null;
      activeTile.style.backgroundColor = null;

      awaitingEnd = false;
      activeTile = null;
    }, 1000);
  })
  return element;
}

for (let i = 0; i < tileCount; i++){
  const random = Math.floor(Math.random() * colorsList.length);
  const color = colorsList[random];
  const card = tileBuild(color);
  colorsList.splice(random, 1);
  tilesContainer.append(card); 
}



