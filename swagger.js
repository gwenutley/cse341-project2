const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Profiles Api",
        description: "Profiles Api"
    },
    host: "localhost:4000",
    schemes: ["http", "https"]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

//generate a swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);