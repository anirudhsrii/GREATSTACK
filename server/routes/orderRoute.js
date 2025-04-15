import express from 'express';
import authUser from '../middlewares/authUser.js';
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe } from '../controllers/orderController.js';
import authSeller from '../middlewares/authSeller.js';

const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD); // For COD orders
orderRouter.post('/user', authUser, getUserOrders); // For fetching user orders
orderRouter.post('/seller', authSeller, getAllOrders); // For fetching seller orders
orderRouter.post('/stripe', authUser, placeOrderStripe); // For Stripe orders

export default orderRouter;