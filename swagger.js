const swaggerAutogen = require("swagger-autogen")()

const outputFile = "./doc/swagger.json"
const routesFiles = ["routes/user.routes.js"]

swaggerAutogen(outputFile, routesFiles)