const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class google_book extends Model {}

google_book.init(
  {
    kind: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    book_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    etag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    selfLink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    authors: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    publishedDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pageCount: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    printType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
   },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'google_book',
  }
);

module.exports = google_book;