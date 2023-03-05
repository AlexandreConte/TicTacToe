const boardRegions = document.querySelectorAll("#gameBoard span")
let virtualBoard = []
let playerTurn = ''

function updateTitle() {
  let playerInput = document.getElementById(playerTurn)
  document.getElementById('playerTurn').innerText = playerInput.value
}

function startGame() {
  virtualBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]
  playerTurn = 'player1'
  document.querySelector('h2').innerHTML = 'Vez de: <span id="playerTurn"></span>'
  updateTitle()
  boardRegions.forEach(element => {
    element.classList.remove('win')
    element.innerText = ''
    element.addEventListener("click", handleBoardClick)
    element.classList.add('pointer')
  })
}

function disableRegion(element) {
  element.classList.remove("pointer")
  element.removeEventListener("click", handleBoardClick)
}

function getWinRegions() {
  const winRegions = []
  for (let i = 0; i < 3; i++) {
    if (virtualBoard[i][0] && virtualBoard[i][0] === virtualBoard[i][1] && virtualBoard[i][0] === virtualBoard[i][2]) {
      winRegions.push(`${i}.0`, `${i}.1`, `${i}.2`)
      return winRegions
    }
    if (virtualBoard[0][i] && virtualBoard[0][i] === virtualBoard[1][i] && virtualBoard[0][i] === virtualBoard[2][i]) {
      winRegions.push(`0.${i}`, `1.${i}`, `2.${i}`)
      return winRegions
    }
  }
  if (virtualBoard[0][0] && virtualBoard[0][0] === virtualBoard[1][1] && virtualBoard[0][0] === virtualBoard[2][2]) {
    winRegions.push('0.0', '1.1', '2.2')
    return winRegions
  }
  if (virtualBoard[2][0] && virtualBoard[2][0] === virtualBoard[1][1] && virtualBoard[2][0] === virtualBoard[0][2]) {
    winRegions.push('2.0', '1.1', '0.2')
    return winRegions
  }
  return winRegions
}

function handleWin(regions) {
  regions.forEach(region => {
    document.querySelector('[data-region="' + region + '"]').classList.add('win')
  })
  const playerName = document.getElementById("playerTurn").textContent
  document.querySelector('h2').innerHTML = playerName + " venceu!"
}

function handleBoardClick(ev) {
  const span = ev.target
  const region = span.dataset.region
  const rowColumn = region.split('.')
  const row = rowColumn[0]
  const column = rowColumn[1]
  if (playerTurn === "player1") {
    span.textContent = "X"
    virtualBoard[row][column] = "X"
  } else {
    span.innerText = "O"
    virtualBoard[row][column] = "O"
  }
  disableRegion(span)

  const winRegions = getWinRegions()

  if (winRegions.length > 0) {
    handleWin(winRegions)
    document.querySelectorAll('span[data-region]').forEach(element => {
      element.classList.remove(['pointer'])
      element.removeEventListener("click", handleBoardClick)
    })
  } else if (virtualBoard.flat().includes('')) {
    playerTurn = playerTurn === "player1" ? "player2" : "player1"
    updateTitle()
  } else {
    document.querySelector('h2').innerHTML = 'Empate!'
  }
}

document.querySelector("#start").addEventListener('click', startGame)