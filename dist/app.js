import session from 'express-session';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import { expressAuthenticatedRouter } from './admin/router.js';
import { generateAdminJSConfig } from './admin/index.js';
import AdminJS from 'adminjs';
import { createYoga } from 'graphql-yoga';
import { logger } from './graphql/logger.js';
import { createContext } from './graphql/context.js';
import { schema } from './graphql/schema.js';
const sessionOptions = {
    secret: process.env.SECRET || 'secreto',
    resave: false,
    saveUninitialized: false,
};
export const attachAdminJS = async (app) => {
    const config = generateAdminJSConfig();
    const adminJS = new AdminJS(config);
    if (process.env.NODE_ENV !== 'production')
        await adminJS.initialize();
    else
        adminJS.watch();
    const adminRouter = expressAuthenticatedRouter(adminJS);
    app.use(adminJS.options.rootPath, adminRouter);
};
export const attachExpressJS = async (app) => {
    app
        .use(cors({ credentials: true, origin: true }))
        .use(morgan('dev'))
        .use(session(sessionOptions))
        .use(compression())
        .use(express.static('files'))
        .use('/static', express.static('public'))
        .get('/', (_, res) => res.send('Hello Life'));
};
export const attachGraphQLYoga = async (app) => {
    const graphQLServer = createYoga({
        schema,
        context: createContext,
        graphiql: {
            defaultQuery: `
            query {
              me {
                id
                name
              }
            }
          `,
        },
        logging: {
            debug(...args) {
                console.log(args);
                logger.debug([...args]);
            },
            info(...args) {
                logger.info([...args]);
            },
            warn(...args) {
                logger.warn([...args]);
            },
            error(...args) {
                logger.error([...args]);
            },
        },
    });
    app.use(graphQLServer);
};
