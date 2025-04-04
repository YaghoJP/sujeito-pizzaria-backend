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
exports.UserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = __importDefault(require("../prisma"));
const jsonwebtoken_1 = require("jsonwebtoken");
class UserService {
    create(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, password }) {
            if (!name) {
                throw new Error("Nome do usuário é obrigatório.");
            }
            if (!email) {
                throw new Error("Email do usuário é obrigatório.");
            }
            if (!password) {
                throw new Error("Senha do usuário é obrigatório.");
            }
            //Validando se já não existe esse usuário no banco.
            const userAlreadyExist = yield prisma_1.default.user.findFirst({
                where: {
                    email: email
                }
            });
            if (userAlreadyExist) {
                throw new Error("Usuário já existe.");
            }
            const passwordHash = yield (0, bcryptjs_1.hash)(password, 8);
            //Falta a parte de criptografar a senha.
            //Criando o usuário de fato.
            const newUser = yield prisma_1.default.user.create({
                data: {
                    email: email,
                    name: name,
                    password: passwordHash
                },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            });
            return newUser;
        });
    }
    auth(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            if (!email) {
                throw new Error("Email do usuário é obrigatório.");
            }
            if (!password) {
                throw new Error("Senha do usuário é obrigatório.");
            }
            const user = yield prisma_1.default.user.findFirst({
                where: {
                    email: email
                }
            });
            if (!user) {
                throw new Error("Usuário não existe.");
            }
            const passwordMatch = yield (0, bcryptjs_1.compare)(password, user.password);
            if (!passwordMatch) {
                throw new Error("Usuário/Senha incorreto.");
            }
            const token = (0, jsonwebtoken_1.sign)({
                name: user.name,
                email: user.name,
            }, process.env.JWT_SECRET, {
                subject: user.id,
                expiresIn: '30d'
            });
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token: token
            };
        });
    }
    detail(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.default.user.findFirst({
                where: {
                    id: userId
                },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            });
            return user;
        });
    }
}
exports.UserService = UserService;
