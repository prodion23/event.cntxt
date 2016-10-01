'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/angularapptemplate-dev'
  },

  // Postgres connection options
  postgres: {
    uri: process.env.DATABASE_URL ||
         'postgres://user:pass@localhost:5432/angularapptemplate'
  },
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  seedDB: true
};
