const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bcrypt = require('bcrypt');



const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = 3000;

app.use(session({
  secret: 'mySecret', // substitua por uma chave secreta forte
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


const routes = require('./routes/index.js'); // Importe as rotas
const { withMongoDb, readData, findUserByNickname, findUserById, writeData } = require('./ex.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Defina as rotas antes do restante do código
app.use('/', routes);

// Evento de conexão do socket.io
io.on('connection', (socket) => {
  console.log('Novo usuário conectado');

  // Evento de recebimento de mensagem de chat
  socket.on('chat message', (data) => {
    io.emit('chat message', data); // Envia a mensagem para todos os clientes conectados
  });

  // Evento de desconexão do socket.io
  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});

passport.use(
  new LocalStrategy({ usernameField: 'nickname', passwordField: 'senha' }, async (nickname, senha, done) => {
    try {
      const user = await findUserByNickname(nickname); // Use a função findUserByNickname aqui
      
      if (!user) {
        return done(null, false, { message: 'Usuário não encontrado' });
      }

       bcrypt.compare(senha, user.senha, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Senha incorreta' });
        }
      });
    } catch (err) {
      console.error(err);
      console.log(user);
      return done(err);
    }
  })
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserById(id); // Use a função findUserById aqui
    done(null, user);
  } catch (err) {
    console.error(err);
    done(err, null);
  }
});

server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
