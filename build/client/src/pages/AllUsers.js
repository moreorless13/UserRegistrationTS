"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = require("@apollo/client");
const queries_1 = require("../utils/queries");
const auth_1 = __importDefault(require("../utils/auth"));
const react_bootstrap_1 = require("react-bootstrap");
const AllUsers = () => {
    const currentUser = auth_1.default.getUser();
    console.log(currentUser);
    const { data, loading } = (0, client_1.useQuery)(queries_1.QUERY_USERS);
    const users = data === null || data === void 0 ? void 0 : data.users;
    console.log(users);
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("nav", { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "nav nav-tabs", id: "nav-tab", role: "tablist" }, { children: (0, jsx_runtime_1.jsx)("a", Object.assign({ className: "nav-item nav-link active", id: "nav-home-tab", "data-toggle": "tab", href: "/", role: "tab", "aria-controls": "nav-home", "aria-selected": "true" }, { children: "Home" })) })) }), (0, jsx_runtime_1.jsx)("h1", { children: "All Users" }), loading ? (0, jsx_runtime_1.jsx)("p", { children: "Loading..." }) : (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Table, Object.assign({ striped: true, bordered: true, hover: true, size: "sm" }, { children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "Username" }), (0, jsx_runtime_1.jsx)("th", { children: "Role" }), (0, jsx_runtime_1.jsx)("th", { children: "Account Status:" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: users.map((user) => (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: user.username }), " ", (0, jsx_runtime_1.jsx)("td", { children: user.role }), " ", (0, jsx_runtime_1.jsx)("td", { children: user.accountStatus })] }, user.id)) })] }))] }));
};
exports.default = AllUsers;
