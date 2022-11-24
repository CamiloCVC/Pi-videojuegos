const axios = require('axios');
const { Genre } = require('../db.js');

const getAllGenders = async () => {
    try {
      const url = await axios.get(`https://api.rawg.io/api/genres?key=fe0415ea52474be795146cbef5787185`)
      url.data.results.map(async genero => {
        const [genre,created] = await Genre.findOrCreate({ 
            where: { 
                name: [genero.name],
            }});
        return genre
       });
        let result = await Genre.findAll()
        return result;
    } catch (error) {
      console.log(error)
    }
    };
    
module.exports = {getAllGenders}