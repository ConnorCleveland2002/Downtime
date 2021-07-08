const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class movies extends Model {}

movies.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    director: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    released: {
      type: DataTypes.STRING format: Date,
      allowNull: false,
    },
   },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'movies',
  }
);

module.exports = movies;