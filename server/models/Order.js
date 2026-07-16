import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },

    customerName: {
      type: String,
      required: true,
    },

    customerPhone: {
      type: String,
      required: true,
    },

    pickupAddress: {
      type: String,
      required: true,
    },

    deliveryAddress: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Placed", "Picked Up", "In Transit", "Delivered"],
      default: "Placed",
    },

    assignedAgent: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  default: null,
},

currentLocation: {
  lat: Number,
  lng: Number,
},

trackingHistory: [
  {
    location: String,
    time: {
      type: Date,
      default: Date.now,
    },
  },
],
},
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);