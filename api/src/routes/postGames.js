const { Router } = require('express');
const { Videogame,Genre } = require('../db.js')

const router = Router();

router.post('/videogames', async (req,res)=>{
    const {name, image, genres, release, rating, platforms, description} = req.body
    try {
        const prueba = await Videogame.create({ 
            name,
            image,
            release,
            rating,
            platforms,
            description
        });
        genres.forEach(async element => {
            const [genre,created] = await Genre.findOrCreate({ 
                where: { 
                    name: [element],
                }});
            await prueba.addGenre(genre)
            console.log(created)
        });
        res.status(200).send(prueba)
    } catch (error) {
        res.status(404).send(error)
    }
    
})

module.exports = router;