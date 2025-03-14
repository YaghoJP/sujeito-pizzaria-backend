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
exports.CategoryController = void 0;
const CategoryService_1 = require("../services/CategoryService");
class CategoryController {
    constructor() {
        this.categoryService = new CategoryService_1.CategoryService();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.body;
                const category = yield this.categoryService.create({ name });
                return res.status(200).json(category);
            }
            catch (err) {
                return res.status(400).json({ Error: err.message });
            }
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield this.categoryService.list();
                return res.status(200).json(categories);
            }
            catch (err) {
                return res.status(400).json({ Error: err.message });
            }
        });
    }
}
exports.CategoryController = CategoryController;
