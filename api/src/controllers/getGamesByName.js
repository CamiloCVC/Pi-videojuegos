const axios = require('axios');
const { Op } = require('sequelize');
const { Videogame, Genre } = require('../db.js');

const getApiInfoByName = async (name) => {
    let gamesByName = []
    try {
        const ApiGamesByName = await axios.get(`https://api.rawg.io/api/games?key=fe0415ea52474be795146cbef5787185&search=${name}`)
        ApiGamesByName.data.results.map(juego => {
            if (gamesByName.length < 15){
                gamesByName.push({
                    id: juego.id,
                    name: juego.name,
                    description: juego.description,
                    release: juego.released,
                    rating: juego.rating,
                    img: juego.background_image,
                    platforms: juego.platforms.map(p => p.platform.name),
                    generes: juego.genres.map(p => p.name)
                })
            }
        })
        return gamesByName
    } catch (error) {
            console.log(error)
    }
}

const getDBInfoByName = async (name) => {
    try {
        let DBJuegosByName = await Videogame.findAll({
            where : {
                name : {[Op.iLike] : '%'+name+'%'}
            },
            include: {
                model: Genre,
                atributes: ['name'],
                throught: {
                    attributes: ['name']
                }
            } 
        })
        const resp = await DBJuegosByName.map(juego => {return{
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
        return resp
    } catch (error) {
        console.log(error)
    }
}

const getAllGamesByName = async (name)=>{
    try {
        const ApiInfo = await getApiInfoByName(name)
        const DBInfo = await getDBInfoByName(name)
        const allinfo = DBInfo.concat(ApiInfo).slice(0,15)
        return allinfo
    } catch (error) {
        console.log(error)
    }
}

module.exports = {getAllGamesByName}