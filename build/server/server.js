"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const http_1 = require("http");
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const schema_1 = require("./schema");
const apollo_server_core_1 = require("apollo-server-core");
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("./config"));
const auth_1 = require("./utils/auth");
const connection_1 = __importDefault(require("./config/connection"));
const PORT = config_1.default.PORT || 3001;
function startApolloServer() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Ignition...");
        const app = (0, express_1.default)();
        const httpServer = (0, http_1.createServer)(app);
        const server = new apollo_server_express_1.ApolloServer({
            schema: schema_1.schema,
            context: auth_1.authMiddleware,
            plugins: [(0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
            csrfPrevention: true
        });
        yield server.start();
        yield (0, connection_1.default)();
        server.applyMiddleware({
            app,
            path: '/graphql'
        });
        app.use(express_1.default.json());
        app.use(body_parser_1.default.json());
        app.use(body_parser_1.default.urlencoded({ extended: false }));
        app.use((0, helmet_1.default)());
        app.use((0, compression_1.default)());
        if (config_1.default.NODE_ENV === 'production') {
            app.use(express_1.default.static(path_1.default.join(__dirname, '../client/build')));
        }
        app.get('*', (req, res) => {
            res.sendFile(path_1.default.join(__dirname, '../client/build/index.html'));
        });
        yield new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
        console.log(`API server running on port http://localhost:${PORT}`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
}
startApolloServer();
