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
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '60d0fe4f5311236168a109ca' },
            name: { type: 'string', example: 'Denis' },
            email: { type: 'string', example: 'user@example.com' },
            avatar: { type: 'string', example: 'https://res.cloudinary.com/...' },
            gender: { type: 'string', enum: ['male', 'female', null], example: 'male' },
            dueDate: { type: 'string', example: '2024-12-31' },
            theme: { type: 'string', enum: ['light', 'blue', 'pink'], example: 'light' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        RegisterUser: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string', example: 'Denis', maxLength: 32 },
            email: { type: 'string', format: 'email', example: 'user@example.com', maxLength: 64 },
            password: { type: 'string', example: 'password123', minLength: 8, maxLength: 128 },
            gender: { type: 'string', enum: ['male', 'female', null] },
            dueDate: { type: 'string', pattern: '^(\\d{4})-(\\d{2})-(\\d{2})$', example: '2024-12-31' },
          },
        },
        LoginUser: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email', example: 'user@example.com' },
            password: { type: 'string', example: 'password123' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Error message' },
          },
        },
        ValidationError: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Validation failed' },
            details: { type: 'object' },
          },
        },
        Task: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            userId: { type: 'string' },
            name: { type: 'string', example: 'Buy vitamins' },
            date: { type: 'string', format: 'date-time' },
            isDone: { type: 'boolean', example: false },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        CreateTask: {
          type: 'object',
          required: ['name', 'date'],
          properties: {
            name: { type: 'string', example: 'Buy vitamins', maxLength: 96 },
            date: { type: 'string', format: 'date-time' },
          },
        },
        UpdateTask: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Buy vitamins' },
            date: { type: 'string', format: 'date-time' },
            isDone: { type: 'boolean' },
          },
        },
        Diary: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            userId: { type: 'string' },
            title: { type: 'string', example: 'My first entry' },
            description: { type: 'string', example: 'Feeling great today!' },
            date: { type: 'string' },
            emotions: {
              type: 'array',
              items: { type: 'string', description: 'Emotion ID' },
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        CreateDiary: {
          type: 'object',
          required: ['title', 'description', 'emotions'],
          properties: {
            title: { type: 'string', example: 'My first entry', maxLength: 64 },
            description: { type: 'string', example: 'Feeling great today!', maxLength: 1000 },
            date: { type: 'string' },
            emotions: {
              type: 'array',
              items: { type: 'string' },
              minItems: 1,
              maxItems: 12,
            },
          },
        },
        UpdateDiary: {
          type: 'object',
          properties: {
            title: { type: 'string', example: 'Updated title' },
            description: { type: 'string', example: 'Updated description' },
            date: { type: 'string' },
            emotions: {
              type: 'array',
              items: { type: 'string' },
            },
          },
        },
        Emotion: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            title: { type: 'string', example: 'Happy' },
          },
        },
        WeekPublic: {
          type: 'object',
          properties: {
            weekNumber: { type: 'integer' },
            analogy: { type: 'string' },
            image: { type: 'string' },
          },
        },
        WeekCurrent: {
          type: 'object',
          properties: {
            currentWeek: { type: 'integer' },
            daysToBirth: { type: 'integer' },
            babyInfo: { $ref: '#/components/schemas/BabyInfo' },
          },
        },
        BabyInfo: {
          type: 'object',
          properties: {
            weekNumber: { type: 'integer' },
            analogy: { type: 'string' },
            babySize: { type: 'number' },
            babyWeight: { type: 'number' },
            image: { type: 'string' },
            babyActivity: { type: 'string' },
            babyDevelopment: { type: 'string' },
            interestingFact: { type: 'string' },
            momDailyTips: { type: 'array', items: { type: 'string' } },
          },
        },
        MomInfo: {
          type: 'object',
          properties: {
            weekNumber: { type: 'integer' },
            feelings: {
              type: 'object',
              properties: {
                states: { type: 'array', items: { type: 'string' } },
                sensationDescr: { type: 'string' },
              },
            },
            comfortTips: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  category: { type: 'string' },
                  tip: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ['src/routes/*.js'],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);