// const seedGoogleBook = require('./googleBook-seeds');
//const seedUsers = require('./user.json');
//const seedMovies = require('./movies-seeds.json');
const sequelize = require('../config/connection');
const { google_book, Song, User } = require('../models');


const bookSeeds = require('./bookSeeds.json');
const musicSeeds = require("./music-seeds.json");
const userSeeds = require('./user.json');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await google_book.bulkCreate(bookSeeds, {
      individualHooks: true,
      returning: true,
    });
  await Song.bulkCreate(musicSeeds, {
    individualHooks: true,
    returning: true,
  });
  await User.bulkCreate(userSeeds, {
    individualHooks: true,
    returning: true
  });
  // await seedMovies();
  console.log("\n---- movieData SEEDED ----\n");
    console.log('\n----- DATABASE SYNCED -----\n');
  
    console.log('\n----- googleBook SEEDED -----\n');

  process.exit(0);
};

seedAll();