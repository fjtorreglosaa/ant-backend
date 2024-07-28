import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { envs } from './envs.plugin';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'ANT Backend Documentation',
    },
    servers: [
      {
        url: envs.SERVER,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        CreateUserDto: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
            },
            password: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
          },
        },
        LoginUserDto: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
            },
            password: {
              type: 'string',
            },
          },
        },
        SearchedTermDto: {
          type: 'object',
          properties: {
            term: {
              type: 'string',
            },
          },
        },
        PaginationDto: {
          type: 'object',
          properties: {
            page: {
              type: 'integer',
              default: 1,
            },
            limit: {
              type: 'integer',
              default: 10,
            },
          },
        },
        UpdateUserDto: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            username: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/presentation/controllers/**/*.ts'] 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export function setupSwagger(app: Express): void {
  app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}
