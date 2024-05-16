const form = document.getElementById('chat-form');
const input = document.getElementById('input-message');
const messages = document.getElementById('messages');

// Definir cores fixas para cada usuário
const userColors = {
  'awaky': 'red',
  'usuario2': 'blue',
  'usuario3': 'green',
  // Adicione mais usuários e cores conforme necessário
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (message !== '') {
    socket.emit('chat message', { username, message });
    input.value = '';
  }
});

// Obter o nickname do cookie
const nickname = getCookie('nickname');

// Função para obter o valor de um cookie pelo nome
function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

// Definir o nickname como o valor da variável username
const username = nickname;


const socket = io();

socket.on('chat message', (data) => {
  const { username, message } = data;

  const li = document.createElement('li');

  // Criar um elemento para exibir o nome de usuário com cor fixa
  const usernameElement = document.createElement('span');
  usernameElement.classList.add('username');
  usernameElement.textContent = `${username}: `;
  usernameElement.style.color = getUserColor(username);

  // Criar um elemento para exibir a mensagem
  const messageElement = document.createElement('span');
  messageElement.textContent = message;

  // Adicionar o nome de usuário e a mensagem ao elemento <li>
  li.appendChild(usernameElement);
  li.appendChild(messageElement);

  messages.appendChild(li);
});

// Função para obter a cor fixa do usuário
function getUserColor(username) {
  if (userColors.hasOwnProperty(username)) {
    return userColors[username];
  }
  // Retornar uma cor padrão caso o usuário não tenha uma cor atribuída
  return 'black';
}

const commandInput = document.getElementById('command-input');
const commandOutput = document.getElementById('command-output');

commandInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const command = commandInput.value.trim().toLowerCase();
    handleCommand(command);
    commandInput.value = '';
  }
});

function handleCommand(command) {
    const commandData = getCommandData(command);
    if (commandData) {
      const output = commandData.replace('nickname', username);
      displayCommandOutput(output);
  
      // Reproduzir o som quando o comando "purr" for recebido
      if (command === 'purr') {
        const purrSound = document.getElementById('purr-sound');
        purrSound.play();
      }
  
      // Reproduzir um som aleatório quando o comando "meow" for recebido
      if (command === 'meow') {
        const randomNumber = Math.floor(Math.random() * 3) + 1;
        const meowSound = document.getElementById(`meow${randomNumber}-sound`);
        meowSound.play();
      }
    }
  }
  

function getCommandData(command) {
  // Carregar o arquivo de comandos externo (commands.json)
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/commands.json', false);
  xhr.send();

  if (xhr.status === 200) {
    const commands = JSON.parse(xhr.responseText);
    return commands[command] || null;
  } else {
    console.error('Erro ao carregar o arquivo de comandos:', xhr.statusText);
    return null;
  }
}

function displayCommandOutput(output) {
    const li = document.createElement('li');
    li.classList.add('command-message');
    li.textContent = output;
    messages.appendChild(li);
    messages.scrollTop = messages.scrollHeight;
  }
  