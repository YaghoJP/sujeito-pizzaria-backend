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
exports.OrderController = void 0;
const OrderService_1 = require("../services/OrderService");
class OrderController {
    constructor() {
        this.orderService = new OrderService_1.OrderService();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { table, name } = req.body;
                const order = yield this.orderService.create({ table, name });
                return res.status(200).json(order);
            }
            catch (err) {
                return res.status(400).json({ Error: err.message });
            }
        });
    }
    remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderID = req.query.orderID;
                const order = yield this.orderService.remove(orderID);
                return res.status(200).json(order);
            }
            catch (err) {
                return res.status(400).json({ Error: err.message });
            }
        });
    }
    addItemOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { orderID, productID, amount } = req.body;
                const item = yield this.orderService.addItemOrder({ orderID, productID, amount });
                return res.status(200).json(item);
            }
            catch (err) {
                return res.status(400).json({ Error: err.message });
            }
        });
    }
    removeItemOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const itemID = req.query.itemID;
                const item = yield this.orderService.removeItemOrder(itemID);
                return res.status(200).json(item);
            }
            catch (err) {
                return res.status(400).json({ Error: err.message });
            }
        });
    }
    sendOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { orderID } = req.body;
                const order = yield this.orderService.sendOrder(orderID);
                return res.status(200).json(order);
            }
            catch (err) {
                return res.status(400).json({ Error: err.message });
            }
        });
    }
    listOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield this.orderService.listOrders();
                return res.status(200).json(orders);
            }
            catch (err) {
                return res.status(400).json({ Error: err.message });
            }
        });
    }
    detailOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderID = req.query.orderId;
                const order = yield this.orderService.detailOrders(orderID);
                return res.status(200).json(order);
            }
            catch (err) {
                return res.status(400).json({ Error: err.message });
            }
        });
    }
    finishOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderID = req.query.orderId;
                const order = yield this.orderService.finishOrder(orderID);
                return res.status(200).json(order);
            }
            catch (err) {
                return res.status(400).json({ Error: err.message });
            }
        });
    }
}
exports.OrderController = OrderController;
