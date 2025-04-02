import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Thrift Zone API",
            version: "1.0.0",
            description: "API documentation for Thrift Zone",
        },
    },
    apis: ["./routes/*.js"],
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);
