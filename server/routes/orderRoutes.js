import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  assignDeliveryAgent,
  updateLocation,
} from "../controllers/orderController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Order (Admin)
router.post(
  "/",
  protect,
  authorize("admin"),
  createOrder
);

// Get All Orders (Admin & Agent)
router.get(
  "/",
  protect,
  authorize("admin", "agent"),
  getOrders
);

// Get Single Order (Admin & Agent)
router.get(
  "/:id",
  protect,
  authorize("admin", "agent"),
  getOrderById
);

// Update Order Status (Admin)
router.put(
  "/:id/status",
  protect,
  authorize("admin"),
  updateOrderStatus
);

// Assign Delivery Agent (Admin)
router.put(
  "/:id/assign",
  protect,
  authorize("admin"),
  assignDeliveryAgent
);

// Update Delivery Location (Admin & Agent)
router.put(
  "/:id/location",
  protect,
  authorize("admin", "agent"),
  updateLocation
);

// Delete Order (Admin)
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteOrder
);

export default router;