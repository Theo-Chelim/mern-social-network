require("dotenv").config({path: "./config/.env"})

const express = require("express")

const PORT = process.env.PORT || 5000 

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello world")
})

app.listen(PORT, () => {
        console.log(`Server listening port ${PORT}...`)
    })