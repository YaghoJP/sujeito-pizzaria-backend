import { Router } from "express";
import multer from "multer";
//Importações dos controllers
import { UserController } from "./controllers/UserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CategoryController } from "./controllers/CategoryController";
import { ProductController } from "./controllers/ProductController";
import uploadConfig from './config/multer'
import { OrderController } from "./controllers/OrderController";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"))

const userController = new UserController();
router.post('/user', userController.create.bind(userController))
router.post('/session', userController.auth.bind(userController))
router.get('/me', isAuthenticated, userController.detail.bind(userController))


const categoryController = new CategoryController();
router.post('/category', isAuthenticated,categoryController.create.bind(categoryController))
router.get('/category', isAuthenticated,categoryController.list.bind(categoryController))


const productController = new ProductController();
//router.post('/product', isAuthenticated, upload.single('file'), productController.create.bind(productController))
router.post('/product', isAuthenticated, productController.create.bind(productController))
router.get('/category/product', isAuthenticated, productController.listByCategory.bind(productController))


const orderController = new OrderController();
router.post('/order', isAuthenticated, orderController.create.bind(orderController))
router.delete('/order', isAuthenticated, orderController.remove.bind(orderController))
router.post('/order/add', isAuthenticated, orderController.addItemOrder.bind(orderController))
router.delete('/order/remove', isAuthenticated, orderController.removeItemOrder.bind(orderController))
router.put('/order/send', isAuthenticated, orderController.sendOrder.bind(orderController))
router.get('/orders', isAuthenticated, orderController.listOrders.bind(orderController))
router.get('/order/detail', isAuthenticated, orderController.detailOrder.bind(orderController))
router.put('/order/finish', isAuthenticated, orderController.finishOrder.bind(orderController))


export {router};