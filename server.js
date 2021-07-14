const express = require("express")

require("dotenv").config({path: "./config/.env"})
require("./config/db")

const userRoutes = require("./routes/user.routes")

const app = express()

app.use(express.json())

app.use('/api/user', userRoutes)

app.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${process.env.PORT}...`)
})