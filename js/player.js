



let form = document.querySelector('.log-player')
let playerXContainer = document.querySelector('.player_x');
let playerOContainer = document.querySelector('.player_o');
let playerTox = document.querySelector('.p-player-x');
let playerToo = document.querySelector('.p-player-o');

// En usuarios tengo mi array de usuarios
let usuarios = JSON.parse(localStorage.getItem('usuarios'))

loadPlayers();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let playerName = document.querySelector('#nombre').value.trim();

    if (playerName) {
        savePlayer(playerName);
        document.querySelector('#nombre').value = '';
        loadPlayers();
    }
});

function savePlayer(name) {
    let players = JSON.parse(localStorage.getItem('players')) || [];
    players.push(name);
    localStorage.setItem('players', JSON.stringify(players));
}

function loadPlayers() {
    let players = JSON.parse(localStorage.getItem('players')) || [];
        playerXContainer.innerHTML = '<h4>Jugador X</h4>';
        playerOContainer.innerHTML = '<h4>Jugador O</h4>';

        players.forEach(player => {
            let playerElementX = document.createElement('div');
            let playerElementO = document.createElement('div');
            playerElementX.textContent = player;
            playerElementO.textContent = player;
            playerElementX.classList.add('cont-date-player-x');
            playerElementO.classList.add('cont-date-player-o');

            playerElementX.addEventListener('click', () => selectPlayer(playerElementX, 'X'));
            playerElementO.addEventListener('click', () => selectPlayer(playerElementO, 'O'));

            playerXContainer.appendChild(playerElementX);
            playerOContainer.appendChild(playerElementO);
        });
}

function selectPlayer(player, role) {
    let selectedX = document.querySelector('.player_x .selected');
    let selectedO = document.querySelector('.player_o .selected');

    if (role === 'X') {
        if (selectedX) {
            selectedX.classList.remove('selected');
        }
        event.target.classList.add('selected');
        if(selectedX) playerTox.innerHTML = `<p>Jugador X: ${selectedX.textContent}</p>`;
    } else if (role === 'O') {
        if (selectedO) {
            selectedO.classList.remove('selected');
        }
        event.target.classList.add('selected');
        if(selectedX) playerToo.innerHTML = `<p>Jugador O: ${selectedO.textContent}</p>`;
    }

    
    
 }

  // Redirigir a la página del juego
  document.querySelector('.play').addEventListener('submit', (e) => {
    e.preventDefault();
    let selectedX = document.querySelector('.player_x .selected');
    let selectedO = document.querySelector('.player_o .selected');

    if (selectedX && selectedO) {
        let playerX = selectedX.textContent;
        let playerO = selectedO.textContent;

        localStorage.setItem('playerX', playerX);
        localStorage.setItem('playerO', playerO);

        window.location.href = 'game.html';
    } else {
        // alert('Por favor, selecciona ambos jugadores.');
        Toastify({

            text: "Debe seleccionar 2 juadores",
            backgroundColor: 'red',
            duration: 2000,
            style: {
                fontSize: '2rem' 
            }
            }).showToast();
    }
});