"use strict";
exports.__esModule = true;
exports.sessionRouter = void 0;
var express_1 = require("express");
var session_controller_1 = require("../controllers/session.controller");
var validatedBody_middleware_1 = require("../middlewares/validatedBody.middleware");
var client_schemas_1 = require("../schemas/client.schemas");
exports.sessionRouter = express_1.Router();
exports.sessionRouter.post('/', validatedBody_middleware_1.validateBody(client_schemas_1.clientLoginSchema), session_controller_1.createLoginController);
