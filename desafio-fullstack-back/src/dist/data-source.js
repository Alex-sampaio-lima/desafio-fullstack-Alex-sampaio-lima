"use strict";
exports.__esModule = true;
exports.AppDataSource = void 0;
require("express-async-errors");
require("reflect-metadata");
require("dotenv/config");
var typeorm_1 = require("typeorm");
var path_1 = require("path");
var DataSourceConfig = function () {
    var entitypath = path_1["default"].join(__dirname, "./entities/*.{ts,js}");
    var migrationspath = path_1["default"].join(__dirname, "./migrations/*.{ts,js}");
    var dburl = process.env.DATABASE_URL;
    if (!dburl) {
        throw new Error('"Missing env: var "DATABASE_URL"');
    }
    return {
        type: "postgres",
        url: dburl,
        logging: true,
        entities: [entitypath],
        migrations: [migrationspath]
        // synchronize: true
    };
};
exports.AppDataSource = new typeorm_1.DataSource(DataSourceConfig());
