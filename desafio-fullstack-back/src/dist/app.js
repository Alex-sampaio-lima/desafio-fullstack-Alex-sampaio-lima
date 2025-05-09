"use strict";
exports.__esModule = true;
exports.app = void 0;
var express_1 = require("express");
var routes_1 = require("./routes");
var handleErrors_middlewares_1 = require("./middlewares/handleErrors.middlewares");
var cors_1 = require("cors");
var swagger_ui_express_1 = require("swagger-ui-express");
var swagger_json_1 = require("./swagger.json");
exports.app = express_1["default"]();
exports.app.use(express_1.json());
exports.app.use(cors_1["default"]());
exports.app.use("/api-documentation", swagger_ui_express_1["default"].serve, swagger_ui_express_1["default"].setup(swagger_json_1["default"]));
exports.app.use("/", routes_1.routes);
// app.use(handleZodErrors);
exports.app.use(handleErrors_middlewares_1.handlErrors);
