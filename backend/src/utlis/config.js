require("dotenv").config()

const MONGO_DB_URI = process.env.MONGO_DB_URI;
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;
const EMAIL = process.env.EMAIL;
const PASS = process.env.PASS;
const KEY_ID = process.env.KEY_ID;
const KEY_SECRET = process.env.KEY_SECRET;
const CLOUD_NAME = process.env.CLOUD_NAME;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

module.exports = {
    MONGO_DB_URI ,
    PORT,
    SECRET_KEY,
    EMAIL,
    PASS,
    KEY_ID,
    KEY_SECRET,
    CLOUD_NAME,
    API_KEY,
    API_SECRET
}