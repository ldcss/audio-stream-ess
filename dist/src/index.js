"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./logger"));
const env_1 = __importDefault(require("./env"));
app_1.default.listen(env_1.default.PORT, () => {
    logger_1.default.info(`Server started on http://localhost:${env_1.default.PORT}/api`);
});
