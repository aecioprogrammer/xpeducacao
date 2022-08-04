// Criando variáveis individuais
// let board = [];
// let currentGame = [];
// let savedGames = [];

//criando um objeto
let state = { board: [], currentGame: [], savedGames: [] };

function start() {
  createBoard();
  newGame();
}

function createBoard() {
  state.board = [];

  for (let i = 1; i <= 60; i++) {
    state.board.push(i);
  }
}

function newGame() {
  resetGame();
  render();
  console.log(state.currentGame);
}

function render() {
  renderBoard();
  renderButtons();
  renderSavedGames();
}

/* function renderBoard() {
  const divBoard = document.querySelector("#megasena-board");
  divBoard.innerHTML = "";
  let liNumbers = "";

  for (let i = 0; i < state.board.length; i++) {
    liNumbers += `<ul><li>${state.board[i]}</li></ul>`;
  }

divBoard.innerHTML = `<ul>${liNumbers}</ul>`;
} */

function renderBoard() {
  const divBoard = document.querySelector("#megasena-board");
  divBoard.innerHTML = "";
  let ulNumbers = document.createElement("ul");
  ulNumbers.classList.add("numbers");

  for (let i = 0; i < state.board.length; i++) {
    let currentNumber = state.board[i];
    let liNumbers = document.createElement("li");

    liNumbers.textContent = currentNumber;
    liNumbers.classList.add("number");

    liNumbers.addEventListener("click", handleNumberClick);

    if (isNumberInGame(currentNumber)) {
      liNumbers.classList.add("selected-number");
    }

    ulNumbers.appendChild(liNumbers);
  }

  divBoard.appendChild(ulNumbers);
}

function renderButtons() {
  const divButtons = document.querySelector("#megasena-buttons");
  divButtons.innerHTML = "";

  let buttonNewGame = createNewGameButton();
  let buttonRandomGame = createRandomGameButton();
  let buttonSaveGame = createSaveGameButton();

  divButtons.appendChild(buttonNewGame);
  divButtons.appendChild(buttonRandomGame);
  divButtons.appendChild(buttonSaveGame);
}

function renderSavedGames() {
  const divSavedGames = document.querySelector("#megasena-saved-games");
  divSavedGames.innerHTML = "";

  if (state.savedGames.length === 0) {
    divSavedGames.innerHTML =
      "<p class='emptySavedGames'>Não há nenhum jogo salvo!";
  } else {
    divSavedGames.innerHTML = "<p>Jogos Salvos:</p>";
    ulSavedGames = document.createElement("ul");

    for (let i = 0; i < state.savedGames.length; i++) {
      let currentGame = state.savedGames[i];
      let liGame = document.createElement("li");
      liGame.innerHTML = currentGame;
      ulSavedGames.appendChild(liGame);
    }

    divSavedGames.appendChild(ulSavedGames);
  }
}

function createNewGameButton() {
  const button = document.createElement("button");
  button.textContent = "Novo Jogo";

  button.addEventListener("click", newGame);
  button.classList.add("buttonEnabled");

  return button;
}

function createRandomGameButton() {
  const button = document.createElement("button");
  button.textContent = "Jogo Aleatório";

  button.addEventListener("click", randomGame);
  button.classList.add("buttonEnabled");

  return button;
}

function createSaveGameButton() {
  const button = document.createElement("button");
  button.textContent = "Salvar Jogo";
  button.disabled = !isGameComplete();
  console.log(!button.disabled);

  button.addEventListener("click", saveGame);
  if (button.disabled) {
    button.classList.add(".buttonEnabled");
  }

  return button;
}

function addNumberToGame(numberToAdd) {
  /*   if (numberToAdd < 1 || numberToAdd > 60) {
        console.error("Número inválido: ", numberToAdd);
        return;
      } */

  if (!isNumberValid(numberToAdd)) {
    console.error("Número inválido: ", numberToAdd);
    return;
  }

  if (state.currentGame.length >= 6) {
    console.error("O jogo já está completo!");
    console.table(state.currentGame);
    return;
  }

  if (isNumberInGame(numberToAdd)) {
    console.error("Número já está no jogo.");
    return;
  }

  state.currentGame.push(numberToAdd);
}

function removeNumberFromGame(numberToRemove) {
  if (!isNumberValid(numberToRemove)) {
    console.error("Número inválido: ", numberToAdd);
    return;
  }

  let newGame = [];

  newGame = state.currentGame.filter((number) => {
    return number !== numberToRemove;
  });

  state.currentGame = newGame;
}

function saveGame() {
  if (!isGameComplete()) {
    console.error("O jogo não está completo");
    return;
  }

  state.savedGames.push(state.currentGame.sort((a, b) => a - b));
  newGame();
  console.log(state.savedGames);
}

function handleNumberClick(event) {
  let number = Number(event.currentTarget.textContent);

  if (isNumberInGame(number)) {
    removeNumberFromGame(number);
  } else {
    addNumberToGame(number);
  }

  console.log(state.currentGame);
  //renderBoard();
  render();
}

/* function removeNumberFromCurrentGame(numberToRemove) {
  let newGame = [];

  for (let i = 0; i < state.currentGame.length; i++) {
    if (state.currentGame[i] === numberToRemove) {
      continue;
    }
    newGame.push(state.currentGame[i]);
  }

  state.currentGame = newGame;
} */

function isNumberInGame(numberToCheck) {
  //   if (state.currentGame.includes(numberToCheck)) {
  //     return true;
  //   }

  //   return false;
  return state.currentGame.includes(numberToCheck);
}

function isNumberValid(numberToCheck) {
  return numberToCheck >= 1 && numberToCheck <= 60;
}

function isGameComplete() {
  return state.currentGame.length === 6;
}

function resetGame() {
  state.currentGame = [];
}

function randomGame() {
  resetGame();
  let randomNumber = 0;

  while (!isGameComplete()) {
    randomNumber = Math.ceil(Math.random() * 60);
    addNumberToGame(randomNumber);
  }
  console.log(state.currentGame);
  render();
}

start();
