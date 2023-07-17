const express = require("express")
const { connection } = require("./db")
const { userRouter } = require("./routes/user.route")
const { mediaRouter } = require("./routes/media.route")
require("dotenv").config()
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

app.use("/users", userRouter)
app.use("/posts", mediaRouter)

app.listen(process.env.port,async()=> {
    try {
        await connection
        console.log("Connected to the DB")
        console.log(`Running on port ${process.env.port}`)
    } catch (err) {
        console.log(err)
    }
    
})