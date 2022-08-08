"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const auth_1 = __importDefault(require("../utils/auth"));
const client_1 = require("@apollo/client");
const queries_1 = require("../utils/queries");
const SignUp_1 = __importDefault(require("../components/forms/SignUp"));
const Login_1 = __importDefault(require("../components/forms/Login"));
const DeleteAccount_1 = __importDefault(require("../components/forms/DeleteAccount"));
const LogoutButton_1 = __importDefault(require("../components/buttons/LogoutButton"));
const HomePage = () => {
    const [form, setForm] = (0, react_1.useState)('SignUp');
    const handleFormChange = (form) => setForm(form);
    const { data, loading } = (0, client_1.useQuery)(queries_1.QUERY_ME);
    const user = data === null || data === void 0 ? void 0 : data.me;
    console.log(user);
    if (auth_1.default.loggedIn()) {
        const username = localStorage.getItem('username');
        if ((user === null || user === void 0 ? void 0 : user.role) === 'Admin') {
            return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("nav", { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "nav nav-tabs", id: "nav-tab", role: "tablist" }, { children: [(0, jsx_runtime_1.jsx)("a", Object.assign({ className: "nav-item nav-link active", id: "nav-home-tab", "data-toggle": "tab", href: "#nav-home", role: "tab", "aria-controls": "nav-home", "aria-selected": "true" }, { children: "Home" })), (0, jsx_runtime_1.jsx)("a", Object.assign({ className: "nav-item nav-link", id: "nav-profile-tab", "data-toggle": "tab", href: "#nav-profile", role: "tab", "aria-controls": "nav-profile", "aria-selected": "false" }, { children: "Profile" })), (0, jsx_runtime_1.jsx)("a", Object.assign({ className: "nav-item nav-link", id: "nav-users-tab", "data-toggle": "tab", href: "/users", role: "tab", "aria-controls": "nav-users", "aria-selected": "false" }, { children: "All Users" }))] })) }), (0, jsx_runtime_1.jsxs)("h1", { children: ["Welcome ", username] }), (0, jsx_runtime_1.jsx)(LogoutButton_1.default, {}), (0, jsx_runtime_1.jsx)(DeleteAccount_1.default, {})] }));
        }
        else {
            return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("h1", { children: ["Welcome back, ", username] }), (0, jsx_runtime_1.jsx)(LogoutButton_1.default, {}), (0, jsx_runtime_1.jsx)(DeleteAccount_1.default, {})] }));
        }
    }
    else {
        switch (form) {
            case 'SignUp':
                return ((0, jsx_runtime_1.jsx)(SignUp_1.default, { form: form, handleFormChange: handleFormChange }));
            case 'Login':
                return ((0, jsx_runtime_1.jsx)(Login_1.default, { form: form, handleFormChange: handleFormChange }));
            default:
                return ((0, jsx_runtime_1.jsx)(SignUp_1.default, {}));
        }
    }
};
exports.default = HomePage;
