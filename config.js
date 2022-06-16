require('dotenv').config();

const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: "db4free.net",
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DB,
    },
    listPerPage: 10,
  };
  module.exports = config;