"use strict";
require("dotenv").config();
module.exports = {
    development: {
        dialect: process.env.DB_DIALECT,
        storage: process.env.DB_STORAGE,
    },
};
