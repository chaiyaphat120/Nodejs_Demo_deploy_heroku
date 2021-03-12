const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const mongoose = require("mongoose") //connect mongo
const cors = require('cors')
mongoose.connect(
    "mongodb+srv://chaiyaphat:chaiyaphat123456@cluster0.qwcxx.mongodb.net/properties_finder?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true  ,useCreateIndex:true ,useFindAndModify:false}
) //connect mong0

const indexRouter = require("./routes/index")
const usersRouter = require("./routes/users")
const app = express()
app.use(cors())
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use("/", indexRouter)
app.use("/users", usersRouter)

module.exports = app
