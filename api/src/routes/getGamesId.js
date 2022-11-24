const { Router } = require('express');
const { getGameById } = require('../controllers/getGameById.js')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/videogames/:id', async (req,res)=>{
    const {id} = req.params
    // console.log(id.length)
    try {
        if(id){
            const InfoById= await getGameById(id)
            res.status(200).json(InfoById)
        }
    } catch (error) {
        res.status(404).send(error)
    }

})



module.exports = router;