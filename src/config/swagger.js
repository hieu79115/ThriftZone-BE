import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Thriftzone API",
        version: "1.0.0",
        description: "API document for Thriftzone",
    },
    server: [
        {
            url: "http://localhost:5000",
            description: "local server",
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ["./routes/*.js"],
}

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };