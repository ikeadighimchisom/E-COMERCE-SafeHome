const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config({path: "./CONFIG/.env"})
const app = require("./app.js");
mongoose.set("strictQuery", true)

const Db = process.env.DATABASE
mongoose.connect(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Mongoose Is Connected`)
})

const PORT = process.env.PORT
//const PORT = 9099
app.listen(PORT || 5020, () => {
    console.log(`listening on port:` + PORT)
})

 

