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
exports.OrderService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class OrderService {
    create(_a) {
        return __awaiter(this, arguments, void 0, function* ({ table, name }) {
            if (!table) {
                throw new Error("Número da mesa é obrigatório.");
            }
            return (yield prisma_1.default.order.create({
                data: {
                    table: table,
                    name: name
                },
                select: {
                    id: true,
                    table: true,
                    name: true,
                    draft: true,
                    status: true
                }
            }));
        });
    }
    remove(orderID) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield prisma_1.default.order.delete({
                where: {
                    id: orderID
                }
            }));
        });
    }
    addItemOrder(_a) {
        return __awaiter(this, arguments, void 0, function* ({ orderID, productID, amount }) {
            return (yield prisma_1.default.item.create({
                data: {
                    order_id: orderID,
                    product_id: productID,
                    amount: amount
                },
                select: {
                    id: true,
                    order_id: true,
                    product_id: true,
                    amount: true
                }
            }));
        });
    }
    removeItemOrder(itemID) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield prisma_1.default.item.delete({
                where: {
                    id: itemID
                }
            }));
        });
    }
    sendOrder(orderID) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield prisma_1.default.order.update({
                where: {
                    id: orderID
                },
                data: {
                    draft: false
                }
            }));
        });
    }
    listOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield prisma_1.default.order.findMany({
                where: {
                    draft: true,
                    status: false
                },
                orderBy: {
                    createAt: 'desc'
                }
            }));
        });
    }
    detailOrders(orderID) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield prisma_1.default.item.findMany({
                where: {
                    order_id: orderID
                },
                include: {
                    product: true,
                    order: true
                }
            }));
        });
    }
    finishOrder(orderID) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield prisma_1.default.order.update({
                where: {
                    id: orderID
                },
                data: {
                    status: true
                }
            }));
        });
    }
}
exports.OrderService = OrderService;
