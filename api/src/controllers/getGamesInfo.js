const axios = require('axios');
const { Videogame, Genre } = require('../db.js');

const getApiInfo = async () => {
    let url = `https://api.rawg.io/api/games?key=fe0415ea52474be795146cbef5787185`
    let juegos = []
    try {
        for(let i = 0; i < 5; i++){
            const resp = await axios.get(url)
            resp.data.results.map( juego => {
                juegos.push({
                    id: juego.id,
                    name: juego.name,
                    description: juego.description,
                    release: juego.released,
                    rating: juego.rating,
                    img: juego.background_image,
                    platforms: juego.platforms.map(p => p.platform.name),
                    generes: juego.genres.map(p => p.name)
                })
            })
            url = resp.data.next
        }
        return juegos
    } catch (error) {
        console.log(error)
    }
}


const getDBinfo = async () => {
    try {
        let dbjuegos = await Videogame.findAll({
            include: [{
                model: Genre,
                atributes: ['name'],
                throught: {
                    attributes: []
                }
            }]   
        })
        const allgames = await dbjuegos.map(juego => {return{
            id: juego.id,
            name: juego.name,
            release: juego.release,
            rating: juego.rating,
            description: juego.description,
            img: juego.image,
            platforms: juego.platforms,
            createdInDb: juego.createdInDb,
            generes: juego.genres.map(genere=> genere.name[0])
        }})
        return allgames
    } catch (error) {
        console.log(error)
    }
}

const getGamesinfo = async () => {
    try {
        const ApiInfo = await getApiInfo()
        const DBInfo = await getDBinfo()
        const allinfo = DBInfo.concat(ApiInfo)
        return allinfo
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = {getGamesinfo}