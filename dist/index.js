"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.get('/about', (req, res) => {
    res.send('Route about called');
});
app.post('/about', (req, res) => {
    var _a, _b;
    console.log(req.body);
    const temp = req.body;
    res.send((_b = ((_a = temp.persons) === null || _a === void 0 ? void 0 : _a[0].age)) !== null && _b !== void 0 ? _b : "Not found");
});
app.listen(port, () => {
    console.log(`[server] is running at https://localhost:${port}`);
});
