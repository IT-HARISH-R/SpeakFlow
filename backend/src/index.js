const app = require("./app");
const mongoose = require("mongoose");
const { MONGO_DB_URI, PORT } = require("./utlis/config");

const port = PORT || 4000
mongoose.connect(MONGO_DB_URI)
    .then(() => {
        console.log("Connecting database")
        app.listen(port, () => {
            console.log("server run");
        })
    })
    .catch((error) => {
        console.log(error)
    })
