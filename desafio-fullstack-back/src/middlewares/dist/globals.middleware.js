"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.verifyContactPermission = exports.verifyPermission = exports.verifyAdmin = exports.verifyToken = void 0;
var AppError_error_1 = require("../errors/AppError.error");
var jsonwebtoken_1 = require("jsonwebtoken");
exports.verifyToken = function (req, res, next) {
    var authorization = req.headers.authorization;
    if (!authorization) {
        throw new AppError_error_1["default"]("Missing bearer token", 401);
    }
    var token = authorization.split(' ')[1];
    var decoded = jsonwebtoken_1.verify(token, process.env.SECRET_KEY);
    res.locals = __assign(__assign({}, res.locals), { decoded: decoded });
    return next();
};
exports.verifyAdmin = function (req, res, next) {
    var admin = res.locals.decoded.admin;
    if (!admin)
        throw new AppError_error_1["default"]("insufficient permissions", 403);
    return next();
};
exports.verifyPermission = function (req, res, next) {
    var clientId = req.params.clientId;
    var _a = res.locals.decoded, sub = _a.sub, admin = _a.admin;
    var id = res.locals.decoded.id;
    if (admin)
        return next();
    if (clientId !== sub)
        throw new AppError_error_1["default"]("Insufficient permissions, you don't have access to this account ", 409);
    return next();
};
exports.verifyContactPermission = function (req, res, next) {
    var sub = res.locals.decoded.sub;
    var admin = res.locals.decoded.admin;
    var foundContact = res.locals.foundContact.clientId;
    if (admin)
        return next();
    if (foundContact !== sub) {
        throw new AppError_error_1["default"]("Insufficient permissions, you don't have access to this account ", 409);
    }
    return next();
};
