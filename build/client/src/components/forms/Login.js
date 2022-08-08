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
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const client_1 = require("@apollo/client");
const mutations_1 = require("../../utils/mutations");
const auth_1 = __importDefault(require("../../utils/auth"));
const ForgotPasswordForm_1 = __importDefault(require("./ForgotPasswordForm"));
const LoginForm = ({ form, handleFormChange }) => {
    const [userFormData, setUserFormData] = (0, react_1.useState)({ username: '', password: '' });
    const [validated, setValidated] = (0, react_1.useState)(false);
    const [showAlert, setShowAlert] = (0, react_1.useState)(false);
    const [login, { error }] = (0, client_1.useMutation)(mutations_1.LOGIN_USER);
    (0, react_1.useEffect)(() => {
        if (error) {
            setShowAlert(true);
        }
        else {
            setShowAlert(false);
        }
    }, [error]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserFormData(Object.assign(Object.assign({}, userFormData), { [name]: value }));
    };
    const handleFormSubmit = (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        try {
            const { data } = yield login({
                variables: Object.assign({}, userFormData),
            });
            localStorage.setItem('username', userFormData.username);
            auth_1.default.login(data.login.token);
        }
        catch (error) {
            console.error(error);
            setShowAlert(true);
        }
        ;
        setUserFormData({
            username: '',
            password: '',
        });
    });
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "container bg-warning rounded pt-2 pb-2" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Login" }), (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Form, Object.assign({ noValidate: true, validated: validated, onSubmit: handleFormSubmit }, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Alert, Object.assign({ dismissible: true, onClose: () => setShowAlert(false), show: showAlert, variant: 'danger' }, { children: "Something went wrong with your login credentials!" })), (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Form.Group, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Label, Object.assign({ htmlFor: 'username' }, { children: "Username" })), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Control, { type: 'text', placeholder: 'Username', name: 'username', onChange: handleInputChange, value: userFormData.username, required: true }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Control.Feedback, Object.assign({ type: 'invalid' }, { children: "Username is required!" }))] }), (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Form.Group, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Label, Object.assign({ htmlFor: 'username' }, { children: "Password" })), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Control, { type: 'password', placeholder: 'Password', name: 'password', onChange: handleInputChange, value: userFormData.password, required: true }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Control.Feedback, Object.assign({ type: 'invalid' }, { children: "Password is required!" }))] }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'row justify-content-center' }, { children: (0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, Object.assign({ className: 'padding bg-dark rounded justify-content-center', disabled: !(userFormData.username && userFormData.password), type: 'submit', variant: 'success' }, { children: "Submit" })) })), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'row justify-content-center' }, { children: (0, jsx_runtime_1.jsx)(ForgotPasswordForm_1.default, {}) }))] })), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, Object.assign({ variant: 'dark', onClick: () => handleFormChange('SignUp') }, { children: "SignUp Form" }))] })));
};
exports.default = LoginForm;
