"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const auth_1 = __importDefault(require("../../utils/auth"));
const LogoutButton = () => {
    const handleLogout = () => {
        auth_1.default.logout();
    };
    return ((0, jsx_runtime_1.jsx)("button", Object.assign({ className: "btn btn-danger", onClick: handleLogout }, { children: "Logout" })));
};
exports.default = LogoutButton;
