const mongoose = require("mongoose")

mongoose.connect(
    `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/mern-social-network`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
)
.then(() => console.log("Connected to mongoose"))
.catch((err) => console.log("Unable to connect to mongoose", err))