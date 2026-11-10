import { NextFunction, Request, Response } from "express";
import { T } from "../libs/types/common";
import CustomerService from "../models/Customer.service";
import {
  AdminRequest,
  LoginInput,
  CustomerInput,
} from "../libs/types/customer";
import { CustomerType } from "../libs/enums/customer.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";

const customerService = new CustomerService();

const adminController: T = {};
adminController.goHome = (req: Request, res: Response) => {
  try {
    console.log("[goHome] API ishga tushdi!");
    res.render("home");
  } catch (err) {
    console.error("Error, goHome", err);
    res.redirect("/admin");
  }
};

adminController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("[getSignup] API ishga tushdi!");
    res.render("signup");
  } catch (err) {
    console.error("Error, getSignup", err);
    res.redirect("/admin");
  }
};

adminController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("[getLogin] API ishga tushdi!");
    res.render("login");
  } catch (err) {
    console.error("Error, getLogin", err);
    res.redirect("/admin");
  }
};

adminController.processSignup = async (req: AdminRequest, res: Response) => {
  try {
    console.log("[processSignup] API ishga tushdi!");
    const file = req.file;
    if (!file)
      throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);

    const newCustomer: CustomerInput = req.body;
    newCustomer.image = file?.path.replace(/\\/g, "/");
    newCustomer.customerType = CustomerType.ADMIN;

    const result = await customerService.processSignup(newCustomer);

    // Sessions authentication
    req.session.customer = result;
    req.session.save(() => {
      res.redirect("/admin/product/all");
    });
  } catch (err) {
    console.error("Error, processSignup", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script>alert("${message}"); window.location.replace('/admin/signup')</script>`,
    );
  }
};

adminController.processLogin = async (req: AdminRequest, res: Response) => {
  try {
    console.log("[processLogin] API ishga tushdi!");
    const input: LoginInput = req.body;

    const result = await customerService.processLogin(input);

    // Sessions authentication
    req.session.customer = result;
    req.session.save(() => {
      res.redirect("/admin/product/all");
    });
  } catch (err) {
    console.error("Error, processLogin", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script>alert("${message}"); window.location.replace('/admin/login')</script>`,
    );
  }
};

adminController.logout = (req: AdminRequest, res: Response) => {
  try {
    console.log("[logout] API ishga tushdi!");
    req.session.destroy(() => {
      res.redirect("/admin");
    });
  } catch (err) {
    console.error("Error, Logout", err);
    res.redirect("/admin");
  }
};

adminController.getCustomers = async (req: Request, res: Response) => {
  try {
    console.log("[getCustomers] API ishga tushdi!");
    const result = await customerService.getCustomers();

    res.render("users", { users: result });
  } catch (err) {
    console.error("Error, getCustomers:", err);
    res.redirect("/admin/login");
  }
};

adminController.updateChosenCustomer = async (req: Request, res: Response) => {
  try {
    console.log("[updateChosenUser] API ishga tushdi!");
    const result = await customerService.updateChosenCustomer(req.body);

    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    console.error("Error, updateChosenUser:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

adminController.checkAuthSession = (req: AdminRequest, res: Response) => {
  try {
    console.log("[checkAuthSession] API ishga tushdi!");
    if (req.session?.customer)
      res.send(`<script>alert("Hi, ${req.session.customer.name}")</script>`);
    else res.send(`<script>alert("${Message.NOT_AUTHENTICATED}")</script>`);
  } catch (err) {
    console.error("Error, Check Authentication", err);
    res.send(err);
  }
};

adminController.verifyAdmin = (
  req: AdminRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.session?.customer?.customerType === CustomerType.ADMIN) {
    req.customer = req.session.customer;
    next();
  } else {
    const message = Message.NOT_AUTHENTICATED;
    res.send(
      `<script>alert("${message}"); window.location.replace('/admin/login')</script>`,
    );
  }
};

export default adminController;
