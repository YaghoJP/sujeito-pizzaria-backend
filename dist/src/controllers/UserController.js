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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserService_1 = require("../services/UserService");
class UserController {
    constructor() {
        this.userService = new UserService_1.UserService();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const user = yield this.userService.create({ name, email, password });
                return res.status(200).json(user);
            }
            catch (err) {
                return res.status(400).json({ Error: err.message });
            }
        });
    }
    auth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const userlogin = yield this.userService.auth({ email, password });
                return res.status(200).json(userlogin);
            }
            catch (err) {
                return res.status(400).json({ Error: err.message });
            }
        });
    }
    detail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user_id;
                const userDetail = yield this.userService.detail(userId);
                return res.status(200).json(userDetail);
            }
            catch (err) {
                return res.status(400).json({ Error: err.message });
            }
        });
    }
}
exports.UserController = UserController;
