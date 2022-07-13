import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import { schema } from './schema';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import bodyParser from 'body-parser';
import path from 'path';
import sanitizedConfig from './config';
import { authMiddleware } from './utils/auth';
import connectToDatabase from './config/connection';

const PORT = sanitizedConfig.PORT || 3001;

async function startApolloServer() {
    console.log("Ignition...")
    const app = express()
    const httpServer = createServer(app);
    const server = new ApolloServer({
        schema,
        context: authMiddleware,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        csrfPrevention: true
    })

    await server.start()
    await connectToDatabase()
    server.applyMiddleware({
        app,
        path: '/graphql'
    });

    app.use(express.json())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(helmet())
    app.use(compression())


    if (sanitizedConfig.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/build')));
    }

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });

    await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve));
        console.log(`API server running on port http://localhost:${PORT}`)
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
}
startApolloServer()

