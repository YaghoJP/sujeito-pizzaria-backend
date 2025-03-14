"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
//Importações dos controllers
const UserController_1 = require("./controllers/UserController");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const CategoryController_1 = require("./controllers/CategoryController");
const ProductController_1 = require("./controllers/ProductController");
const multer_2 = __importDefault(require("./config/multer"));
const OrderController_1 = require("./controllers/OrderController");
const router = (0, express_1.Router)();
exports.router = router;
const upload = (0, multer_1.default)(multer_2.default.upload("./tmp"));
const userController = new UserController_1.UserController();
router.post('/user', userController.create.bind(userController));
router.post('/session', userController.auth.bind(userController));
router.get('/me', isAuthenticated_1.isAuthenticated, userController.detail.bind(userController));
const categoryController = new CategoryController_1.CategoryController();
router.post('/category', isAuthenticated_1.isAuthenticated, categoryController.create.bind(categoryController));
router.get('/category', isAuthenticated_1.isAuthenticated, categoryController.list.bind(categoryController));
const productController = new ProductController_1.ProductController();
//router.post('/product', isAuthenticated, upload.single('file'), productController.create.bind(productController))
router.post('/product', isAuthenticated_1.isAuthenticated, productController.create.bind(productController));
router.get('/category/product', isAuthenticated_1.isAuthenticated, productController.listByCategory.bind(productController));
const orderController = new OrderController_1.OrderController();
router.post('/order', isAuthenticated_1.isAuthenticated, orderController.create.bind(orderController));
router.delete('/order', isAuthenticated_1.isAuthenticated, orderController.remove.bind(orderController));
router.post('/order/add', isAuthenticated_1.isAuthenticated, orderController.addItemOrder.bind(orderController));
router.delete('/order/remove', isAuthenticated_1.isAuthenticated, orderController.removeItemOrder.bind(orderController));
router.put('/order/send', isAuthenticated_1.isAuthenticated, orderController.sendOrder.bind(orderController));
router.get('/orders', isAuthenticated_1.isAuthenticated, orderController.listOrders.bind(orderController));
router.get('/order/detail', isAuthenticated_1.isAuthenticated, orderController.detailOrder.bind(orderController));
router.put('/order/finish', isAuthenticated_1.isAuthenticated, orderController.finishOrder.bind(orderController));
