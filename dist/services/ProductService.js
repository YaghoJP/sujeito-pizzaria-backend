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
exports.ProductService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class ProductService {
    create(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, price, description, banner, categoryId }) {
            if (!name || !price || !description || !banner || !categoryId) {
                throw new Error("Informe todas os dados necessários para criar um produto.");
            }
            const produto = yield prisma_1.default.product.create({
                data: {
                    name: name,
                    price: price,
                    description: description,
                    category_id: categoryId,
                    banner: banner
                },
                select: {
                    name: true,
                    price: true,
                    description: true,
                    banner: true
                }
            });
            return produto;
        });
    }
    listByCategory(categoryID) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield prisma_1.default.product.findMany({
                where: {
                    category_id: categoryID
                },
                select: {
                    name: true,
                    price: true,
                    description: true,
                    banner: true
                }
            }));
        });
    }
}
exports.ProductService = ProductService;
