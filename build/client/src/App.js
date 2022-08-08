"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = require("@apollo/client");
const context_1 = require("@apollo/client/link/context");
const react_router_dom_1 = require("react-router-dom");
const universal_cookie_1 = __importDefault(require("universal-cookie"));
const Home_1 = __importDefault(require("./pages/Home"));
const AllUsers_1 = __importDefault(require("./pages/AllUsers"));
const ConfirmationSuccess_1 = __importDefault(require("./pages/ConfirmationSuccess"));
const cookies = new universal_cookie_1.default();
const httpLink = (0, client_1.createHttpLink)({
    uri: '/graphql'
});
const authLink = (0, context_1.setContext)((_, { headers }) => {
    const token = localStorage.getItem('id_token') || cookies.get('id_token');
    return {
        headers: Object.assign(Object.assign({}, headers), { authorization: token ? `Bearer ${token}` : '' }),
    };
});
const client = new client_1.ApolloClient({
    link: authLink.concat(httpLink),
    cache: new client_1.InMemoryCache()
});
const App = () => {
    return ((0, jsx_runtime_1.jsx)(client_1.ApolloProvider, Object.assign({ client: client }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'container-fluid' }, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Switch, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: '/', component: Home_1.default }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: '/users', component: AllUsers_1.default }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { exact: true, path: '/confirm/:userId', component: ConfirmationSuccess_1.default })] }) })) }) })));
};
exports.default = App;
