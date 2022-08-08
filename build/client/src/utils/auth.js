"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const universal_cookie_1 = __importDefault(require("universal-cookie"));
const cookies = new universal_cookie_1.default();
class AuthService {
    getUser() {
        return (0, jwt_decode_1.default)(this.getToken());
    }
    loggedIn() {
        const token = this.getToken();
        return token && !this.isTokenExpired(token) ? true : false;
    }
    isTokenExpired(token) {
        const decoded = (0, jwt_decode_1.default)(token);
        try {
            if (decoded.exp < Date.now() / 1000) {
                localStorage.removeItem('id_token');
                cookies.remove('id_token');
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }
    getToken() {
        let token = localStorage.getItem('id_token') || cookies.get('id_token');
        return token;
    }
    login(token) {
        cookies.set('id_token', token);
        localStorage.setItem('id_token', token);
        window.location.assign('/');
    }
    logout() {
        cookies.remove('id_token');
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }
}
exports.default = new AuthService();
