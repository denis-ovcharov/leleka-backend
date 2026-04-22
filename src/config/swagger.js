import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Leleka API',
      version: '1.0.0',
      description: 'API for Leleka pregnancy app',
    },
    servers: [
      {
        url: process.env.SERVER_URL || `http://localhost:${process.env.PORT || 3000}`,
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'accessToken',
          description: 'JWT token stored in httpOnly cookie',
        },
      },
    },
  },
  apis: ['src/routes/*.js'],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);