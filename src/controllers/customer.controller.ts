import { NextFunction, Request, Response } from "express";
import { T } from "../libs/types/common";
import CustomerService from "../models/Customer.service";
import {
  ExtendedRequest,
  LoginInput,
  Customer,
  CustomerInput,
  CustomerUpdateInput,
} from "../libs/types/customer";
import Errors, { HttpCode, Message } from "../libs/Errors";
import AuthService from "../models/Auth.service";
import { AUTH_TIMER } from "../libs/config";

const customerService = new CustomerService();
const authService = new AuthService();

const customerController: T = {};

customerController.getCustomer = async (req: Request, res: Response) => {
  try {
    console.log("[getCustomer] API ishga tushdi!");

    const result = await customerService.getCustomer();

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.error("Error, getCustomer", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

customerController.signup = async (req: Request, res: Response) => {
  try {
    console.log("[signup] API ishga tushdi!");
    const input: CustomerInput = req.body,
      result: Customer = await customerService.signup(input);
    const token = await authService.createToken(result);

    // Token authentication
    res.cookie("accessToken", token, {
      maxAge: AUTH_TIMER * 3600 * 1000,
      httpOnly: false,
    });

    res.status(HttpCode.CREATED).json({ customer: result, accessToken: token });
  } catch (err) {
    console.error("Error, signup", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

customerController.login = async (req: Request, res: Response) => {
  try {
    console.log("[login] API ishga tushdi!");
    const input: LoginInput = req.body,
      result = await customerService.login(input),
      token = await authService.createToken(result);

    // Token authentication
    res.cookie("accessToken", token, {
      maxAge: AUTH_TIMER * 3600 * 1000,
      httpOnly: false,
    });

    res.status(HttpCode.OK).json({ member: result, accessToken: token });
  } catch (err) {
    console.error("Error, login", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

customerController.logout = (req: ExtendedRequest, res: Response) => {
  try {
    console.log("[logout] API ishga tushdi!");
    res.cookie("accessToken", null, { maxAge: 0, httpOnly: true });
    res.status(HttpCode.OK).json({ logout: true });
  } catch (err) {
    console.error("Error, logout", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

customerController.getCustomerDetail = async (
  req: ExtendedRequest,
  res: Response,
) => {
  try {
    console.log("[getCustomerDetail] API ishga tushdi!");
    const result = await customerService.getCustomerDetail(req.customer);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.error("Error, getCustomerDetail", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

customerController.updateCustomer = async (
  req: ExtendedRequest,
  res: Response,
) => {
  try {
    console.log("[updateCustomer] API ishga tushdi!");
    const input: CustomerUpdateInput = req.body;
    if (req.file) input.image = req.file.path.replace(/\\/, "/");

    const result = await customerService.updateCustomer(req.customer, input);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.error("Error, updateCustomer", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

customerController.getTopCustomers = async (req: Request, res: Response) => {
  try {
    console.log("[getTopCustomers] API ishga tushdi!");
    const result = await customerService.getTopCustomers();

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.error("Error, getTopCustomers", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

customerController.verifyAuth = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies["accessToken"];
    if (token) req.customer = await authService.checkAuth(token);

    if (!req.customer)
      throw new Errors(HttpCode.UNAUTHORIZED, Message.NOT_AUTHENTICATED);

    next();
  } catch (err) {
    console.error("Error, verifyAuth", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

customerController.retrieveAuth = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies["accessToken"];
    if (token) req.customer = await authService.checkAuth(token);

    next();
  } catch (err) {
    console.error("Error, retrieveAuth", err);
    next();
  }
};

export default customerController;
