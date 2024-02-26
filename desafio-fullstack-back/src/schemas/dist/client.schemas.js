"use strict";
exports.__esModule = true;
exports.clientLoginSchema = exports.clientUpdateSchema = exports.clientWithoutAdminSchema = exports.clientReadByIdSchema = exports.clientReadSchema = exports.clientReturnSchema = exports.clientCreateSchema = exports.clientSchema = void 0;
var zod_1 = require("zod");
var contact_schemas_1 = require("./contact.schemas");
exports.clientSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string().max(60).refine(function (value) { return value.length <= 60; }, { message: "O nome deve conter apenas 60 caracteres" }),
    password: zod_1.z.string().max(255),
    tel: zod_1.z.string().max(11).refine(function (value) { return value.length <= 11; }, { message: 'O número de telefone deve ter no máximo 11 caracteres.' }),
    registrationDate: zod_1.z.string().or(zod_1.z.date()),
    admin: zod_1.z.boolean()["default"](false)
});
exports.clientCreateSchema = exports.clientSchema.pick({ name: true, password: true, tel: true, admin: true });
exports.clientReturnSchema = exports.clientSchema.omit({ password: true, admin: true });
exports.clientReadSchema = exports.clientReturnSchema.extend({ contact: contact_schemas_1.contactWitouthClient.array() }).array();
exports.clientReadByIdSchema = exports.clientSchema.extend({ contact: contact_schemas_1.contactWitouthClient.array() }).omit({ password: true, admin: true }).array();
exports.clientWithoutAdminSchema = exports.clientCreateSchema.omit({ admin: true });
exports.clientUpdateSchema = exports.clientWithoutAdminSchema.omit({ password: true });
exports.clientLoginSchema = exports.clientSchema.omit({ tel: true, admin: true, registrationDate: true, id: true });
