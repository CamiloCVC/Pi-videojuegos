const { Router } = require('express');
const { getAllGenders } = require('../controllers/getGenres.js');


const router = Router();

router.get('/genres', async (req,res)=>{
    try {
        const genres = await getAllGenders()
        res.status(200).json(genres)
    } catch (error) {
        res.status(400).send("F")
    }
    
})


module.exports = router;