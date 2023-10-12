"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const UserController_1 = __importDefault(require("./src/v1/controllers/UserController"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// parses incoming requests with JSON payloads
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: ["http://localhost:8081", "https://origin2.com"] }));
/**
 * Routes.
 */
app.use('/api', UserController_1.default);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
