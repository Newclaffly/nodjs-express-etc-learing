"use strict";
exports.__esModule = true;
var express_1 = require("express");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
var app = (0, express_1["default"])();
var port = process.env.PORT;
app.get('/', function (req, res) {
    res.send('Express + TypeScript Server');
});
app.get('/about', function (req, res) {
    res.send('Route about called');
});
app.post('/about', function (req, res) {
    // console.log(req.body)
    var _a, _b;
    // const temp: {
    //     username: string,
    //     array: number[],
    //     persons?: {
    //         age: string,
    //     }[]
    // } = req.body
    // res.send(temp.persons?.[0].age)
    console.log(req.body);
    var temp = req.body;
    res.send((_b = ((_a = temp.persons) === null || _a === void 0 ? void 0 : _a[0].age)) !== null && _b !== void 0 ? _b : "Not found");
});
app.listen(port, function () {
    console.log("[server] is running at https://localhost:".concat(port));
});
