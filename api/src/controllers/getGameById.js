const axios = require('axios');
const { Videogame, Genre } = require('../db.js');


const getApiGameById = async (id) =>{
    let gameById = []
    try {
        let ApiGamesById = await axios.get(`https://api.rawg.io/api/games/${id}?key=fe0415ea52474be795146cbef5787185`);
        gameById.push({
            id: ApiGamesById.data.id,
            name: ApiGamesById.data.name,
            description: ApiGamesById.data.description.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, ""),
            release: ApiGamesById.data.released,
            rating: ApiGamesById.data.rating,
            img: ApiGamesById.data.background_image,
            platforms: ApiGamesById.data.platforms.map(p => p.platform.name),
            generes: ApiGamesById.data.genres.map(p => p.name)
        })
        return gameById
    } catch (error) {
        console.log(error)
    }
}

const getDBGameById = async (id)=>{
    try {
        let DBJuegosById = await Videogame.findAll({
            where : {
                id : id
            },
            include: {
                model: Genre,
                atributes: ['name'],
                throught: {
                    attributes: []
                }
            } 
        })
        
        const resp = await DBJuegosById.map(juego => {return{
            id: juego.id,
            description: juego.description,
            name: juego.name,
            rating: juego.rating,
            img: juego.background_image,
            platforms: juego.platforms,
            release: juego.released,
            createdInDb: juego.createdInDb,
            generes: juego.genres.map(genere=> genere.name)
        }})
        // console.log(resp)
        return resp
    } catch (error) {
        console.log(error)
    }
}

const getGameById = async (id) => {
    try {
        const infoDB = await getDBGameById(id)
        const infoApi = await getApiGameById(id)
        if (infoDB) return infoDB
        if (infoApi) return infoApi
    } catch (error) {
        console.log(error.message)
    }
}


module.exports = {getGameById}