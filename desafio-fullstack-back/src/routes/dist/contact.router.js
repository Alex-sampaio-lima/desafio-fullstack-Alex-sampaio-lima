"use strict";
exports.__esModule = true;
exports.contactRouter = void 0;
var express_1 = require("express");
var contact_controllers_1 = require("../controllers/contact.controllers");
var verifyIdClientExists_middleware_1 = require("../middlewares/verifyIdClientExists.middleware");
var verifyIdContactExists_middleware_1 = require("../middlewares/verifyIdContactExists.middleware");
var verifyIfEmailExist_middleware_1 = require("../middlewares/verifyIfEmailExist.middleware");
var vefiryIfTelIsValid_middleware_1 = require("../middlewares/vefiryIfTelIsValid.middleware");
var globals_middleware_1 = require("../middlewares/globals.middleware");
exports.contactRouter = express_1.Router();
exports.contactRouter.get("/", globals_middleware_1.verifyToken, globals_middleware_1.verifyAdmin, contact_controllers_1.readContactController);
exports.contactRouter.get("/:contactId", globals_middleware_1.verifyToken, globals_middleware_1.verifyPermission, contact_controllers_1.readContactByIdController);
exports.contactRouter.post("/:clientId", globals_middleware_1.verifyToken, globals_middleware_1.verifyPermission, vefiryIfTelIsValid_middleware_1.vefiryIfTelIsValid, verifyIdClientExists_middleware_1.verifyIdClientExists, verifyIfEmailExist_middleware_1.verifyIfEmailExist, contact_controllers_1.createContactController);
exports.contactRouter.use("/:contactId", verifyIfEmailExist_middleware_1.verifyIfEmailExist);
exports.contactRouter.patch("/:contactId", globals_middleware_1.verifyToken, verifyIdContactExists_middleware_1.verifyIdExistsContact, globals_middleware_1.verifyContactPermission, vefiryIfTelIsValid_middleware_1.vefiryIfTelIsValid, contact_controllers_1.updateContactController);
exports.contactRouter["delete"]("/:contactId", globals_middleware_1.verifyToken, verifyIdContactExists_middleware_1.verifyIdExistsContact, globals_middleware_1.verifyContactPermission, contact_controllers_1.deleteContactController);
