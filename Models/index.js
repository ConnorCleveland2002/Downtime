const User = require('./user');
const google_book = require('./google_book');
const Song = require('./songs');


User.hasMany(google_book, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

google_book.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, google_book, Song };

// module.exports = { User };
