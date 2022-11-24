const { Router } = require('express');
const getGames = require('./getGames.js')
const postGames = require('./postGames.js')
const getGamesId = require('./getGamesId.js')
const getGenre = require('./getGenre.js')
// Importar todos los routers;

// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', getGames)
router.use('/', postGames)
router.use('/', getGamesId)
router.use('/', getGenre)


module.exports = router;
