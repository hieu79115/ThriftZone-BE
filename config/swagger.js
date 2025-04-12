import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Thrift Zone API",
            version: "1.0.0",
            description: "API documentation for Thrift Zone",
        },
        servers: [
            {
                url: "",
                description: "Development server"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    in: "header"
                }
            }
        },
    },
    apis: ["./routes/*.js"],
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);