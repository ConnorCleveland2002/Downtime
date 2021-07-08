const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Song extends Model {}

Song.init(
  {
    song_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    song_title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    artist: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    album: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    song_link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize }
);

module.exports = Song;
