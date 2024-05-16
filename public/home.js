document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var nickname = document.getElementById('nicknameInput').value;
    var password = document.getElementById('passwordInput').value;
    validarUsuario(nickname, password);
  });
  
  function setNicknameCookie(nickname) {
    document.cookie = `nickname=${encodeURIComponent(nickname)}`;
  }
  
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
  
  // Função para animar o gatinho
  function animarGatinho() {
    // Obtém a referência para a imagem do gatinho
    var gatinho = document.getElementById('gatinho');
  
    // Define a posição inicial do gatinho
    var posicao = 0;
  
    function moveGatinho() {
      // Move o gatinho para a próxima posição
      posicao += 10;
      gatinho.style.left = posicao + 'px';
  
      // Verifica se o gatinho atingiu o final da header
      if (posicao >= window.innerWidth) {
        // Reinicia a posição do gatinho
        posicao = -100;
      }
  
      // Chama a função novamente após um pequeno intervalo de tempo
      requestAnimationFrame(moveGatinho);
    }
  
    // Inicia a animação do gatinho
    moveGatinho();
  }
  
  // Chamar a função de animação do gatinho
  animarGatinho();
  