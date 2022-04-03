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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const allowedOrigins = ['http://localhost:3006'];
const options = {
    origin: allowedOrigins
};
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)(options));
// app.use(express.json())
const prisma = new client_1.PrismaClient();
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield prisma.user.create({
        data: {
            username: username,
            password: password,
        }
    });
    res.json(user);
}));
app.post("/createManyUsers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userList } = req.body;
    const user = yield prisma.user.createMany({
        data: userList
    });
    res.json(user);
}));
app.post("/createManyCars", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { carList } = req.body;
    const cars = yield prisma.car.createMany({
        data: carList
    });
    res.json(cars);
}));
app.get("/getallCars", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cars = yield prisma.car.findMany();
    res.json(cars);
}));
app.get("/getCar", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany({
        include: { cars: true },
    });
    res.json(users);
}));
app.get("/byId/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const users = yield prisma.user.findUnique({
        where: {
            id: Number(id),
        }
    });
    res.json(users);
}));
app.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, username, password } = req.body;
    const updatedUser = yield prisma.user.update({
        where: {
            id: id,
        },
        data: {
            username: username,
            password: password
        },
    });
    res.json(updatedUser);
}));
app.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const deletedUser = yield prisma.user.delete({
        where: {
            id: Number(id),
        },
    });
    res.json(deletedUser);
}));
app.listen(port, () => {
    console.log(`[server] is running at https://localhost:${port}`);
});
