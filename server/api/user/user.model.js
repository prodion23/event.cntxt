'use strict';

var crypto = require('crypto');
var authTypes = ['github', 'twitter', 'facebook', 'google'];

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    email   : { type: DataTypes.STRING, allowNull: false, unique: true },
    role    : { type: DataTypes.STRING, defaultValue: 'user' },
    salt    : { type: DataTypes.STRING },
    facebook: { type: DataTypes.STRING },
    google  : { type: DataTypes.STRING },
    github  : { type: DataTypes.STRING }
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Thing)
      }
    }
  });

  return User;
};
