import { ObjectId } from "mongoose";
import { CustomerStatus, CustomerType } from "../enums/customer.enum";
import { Request } from "express";
import { Session } from "express-session";

export interface Customer {
  _id: ObjectId;
  customerType: CustomerType;
  status: CustomerStatus;
  name: string;
  phone: string;
  password?: string;
  address?: string;
  description?: string;
  image?: string;
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerInput {
  customerType?: CustomerType;
  status?: CustomerStatus;
  name: string;
  phone: string;
  password: string;
  address?: string;
  description?: string;
  image?: string;
  points?: number;
}

export interface LoginInput {
  name: string;
  password: string;
}

export interface CustomerUpdateInput {
  _id: ObjectId;
  status?: CustomerStatus;
  name?: string;
  phone?: string;
  password?: string;
  address?: string;
  description?: string;
  image?: string;
}

export interface ExtendedRequest extends Request {
  customer: Customer;
  file: Express.Multer.File;
  files: Express.Multer.File[];
}

export interface AdminRequest extends Request {
  customer: Customer;
  session: Session & { customer: Customer };
  file: Express.Multer.File;
  files: Express.Multer.File[];
}
