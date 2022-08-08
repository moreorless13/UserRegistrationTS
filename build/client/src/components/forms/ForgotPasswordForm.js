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
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const mutations_1 = require("../../utils/mutations");
const client_1 = require("@apollo/client");
const ForgotPasswordForm = () => {
    const [userFormData, setUserFormData] = (0, react_1.useState)({ email: '' });
    const [validated] = (0, react_1.useState)(false);
    const [showAlert, setShowAlert] = (0, react_1.useState)(false);
    const [forgotPassword, { error }] = (0, client_1.useMutation)(mutations_1.FORGOT_PASSWORD);
    const [showModal, setShowModal] = (0, react_1.useState)(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    (0, react_1.useEffect)(() => {
        if (error) {
            setShowAlert(true);
        }
        else {
            setShowAlert(false);
        }
    }, [error]);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData(Object.assign(Object.assign({}, userFormData), { [name]: value }));
    };
    const handleFormSubmit = (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        try {
            const data = yield forgotPassword({
                variables: Object.assign({}, userFormData)
            });
            return data;
        }
        catch (error) {
            console.error(error);
            setShowAlert(true);
        }
        setUserFormData({ email: '' });
    });
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, Object.assign({ onClick: handleShowModal, variant: 'danger' }, { children: "Forgot Password" })), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Modal, Object.assign({ show: showModal, onHide: handleCloseModal }, { children: (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Form, Object.assign({ noValidate: true, validated: validated, onSubmit: handleFormSubmit, className: "container bg-warning rounded pt-2 pb-2" }, { children: [(0, jsx_runtime_1.jsxs)(react_bootstrap_1.Modal.Header, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Alert, Object.assign({ dismissible: true, onClose: () => setShowAlert(false), show: showAlert, variant: 'danger' }, { children: "Invalid Email Address" })), (0, jsx_runtime_1.jsx)("i", { className: "bi bi-file-excel-fill", onClick: handleCloseModal })] }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Modal.Body, { children: (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Form.Group, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Label, Object.assign({ htmlFor: 'email' }, { children: "Account Email Address" })), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Control, { type: "email", placeholder: 'Account Email Address', name: 'email', onChange: handleInputChange, value: userFormData.email, required: true }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Control.Feedback, Object.assign({ type: "invalid" }, { children: "Email Address Required" }))] }) }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Modal.Footer, { children: (0, jsx_runtime_1.jsx)(react_bootstrap_1.Button, Object.assign({ className: 'padding bg-dark', disabled: !userFormData.email, type: 'submit', variant: 'success' }, { children: "Submit" })) })] })) }))] }));
};
exports.default = ForgotPasswordForm;
