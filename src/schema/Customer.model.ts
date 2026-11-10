import mongoose, { Schema } from "mongoose";
import { CustomerStatus, CustomerType } from "../libs/enums/customer.enum";

// Schema first & Code first

const customerSchema = new Schema(
  {
    customerType: {
      type: String,
      enum: CustomerType,
      default: CustomerType.CUSTOMER,
    },

    status: {
      type: String,
      enum: CustomerStatus,
      default: CustomerStatus.ACTIVE,
    },

    name: {
      type: String,
      index: { unique: true, sparse: true },
      required: true,
    },

    phone: {
      type: String,
      index: { unique: true, sparse: true },
      required: true,
    },

    password: {
      type: String,
      select: false,
      required: true,
    },

    address: {
      type: String,
    },

    description: {
      type: String,
    },

    image: {
      type: String,
    },

    points: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }, // updatedAt, createdAt
);

export default mongoose.model("Customer", customerSchema);
