const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
   sequelize.define('genre', {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
      },
      name: {
         type: DataTypes.ENUM(
            "Action", "Indie", "Adventure", "RPG", "Strategy", "Shooter", "Casual", "Simulation", "Puzzle", "Arcade", "Platformer", "Racing", "Massively Multiplayer", "Sports", "Fighting", "Family", "Board Games", "Educational", "Card",
         ),
         allowNull: false
      }
   }, {
      timestamps: false
   })
}