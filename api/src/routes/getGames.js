const { Router } = require('express');
const { getAllGamesByName } = require('../controllers/getGamesByName.js');
const { getGamesinfo } = require('../controllers/getGamesinfo.js')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/videogames', async (req,res)=>{
    const {name} = req.query
    try {
        if (name){
            const InfoByName = await getAllGamesByName(name)
            if (!InfoByName.length) throw new Error ("No existe el juego")
            res.status(200).json(InfoByName)
        }else{
            const allinfo = await getGamesinfo()
            res.status(200).json(allinfo)
        }
    } catch (error) {
        res.status(404).send(error.message)
    }

})



module.exports = router;