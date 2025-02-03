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
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config();
const pgClient = new pg_1.Client({
    connectionString: process.env.DB_CONNECTION,
});
pgClient.connect();
app.post("signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    try {
        const inserQuery = `INSERT INTO users (username,password,email) VALUES ($1,$2,$3)`;
        const response = yield pgClient.query(inserQuery, [username, password, email]);
        res.json({
            msg: "You have signUp"
        });
    }
    catch (e) {
        console.log(e);
        res.json({
            msg: "Error while signing UP!"
        });
    }
}));
