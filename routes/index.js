const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { withMongoDb, readData, findUserByNickname, findUserById, writeData } = require('./../ex.js');


let users=[];


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'home.html'));
});
  
  router.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'chat.html'));
  });
  
  router.get('/cafe', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'cafe/cafe.html'));
  });

  router.get('/cfs', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'cafe/cfs/tetris.html'));
  });

   router.get('/escritorio', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'meeting/meeting.html'));
  });

  router.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'registro.html'));
  });

  router.get('/draw', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'meeting/etchasketch/draw.html'));
  });

  router.post('/register', async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.senha, 10);
      const user = {
        id: Date.now(),
        nome: req.body.nome,
        nickname: req.body.nickname,
        email: req.body.email,
        senha: hashedPassword,
        userColors: req.body.userColors
      };
      users.push(user);
      // Aguarde a conclusão da função writeData antes de redirecionar
      await writeData(users);
      res.redirect('/');
    } catch (err) {
      console.error(err); // Adicione esta linha para ver o erro no console, se houver algum
      res.redirect('/registro');
    }
  });


// Rota para autenticação de usuários (POST)
router.post(
  '/login',
   passport.authenticate('local', {
    successRedirect: '/chat',
    failureRedirect: '/',
  })
);

  module.exports = router;
  