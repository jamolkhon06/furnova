import CustomerModel from "../schema/Customer.model";
import {
  LoginInput,
  Customer,
  CustomerInput,
  CustomerUpdateInput,
} from "../libs/types/customer";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { CustomerStatus, CustomerType } from "../libs/enums/customer.enum";
import * as bcrypt from "bcryptjs";
import { shapeIntoMongooseObjectId } from "../libs/config";

class CustomerService {
  private readonly customerModel;

  constructor() {
    this.customerModel = CustomerModel;
  }

  /* SPA */

  public async getCustomer(): Promise<Customer> {
    const result = await this.customerModel
      .findOne({ customerType: CustomerType.ADMIN })
      .lean()
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async signup(input: CustomerInput): Promise<Customer> {
    const salt = await bcrypt.genSalt();
    input.password = await bcrypt.hash(input.password, salt);

    try {
      const result = await this.customerModel.create(input);
      result.memberPassword = "";
      return result.toJSON();
    } catch (err) {
      console.error("Error, model:signup", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE);
    }
  }

  public async login(input: LoginInput): Promise<Customer> {
    const customer = await this.customerModel
      .findOne(
        {
          name: input.name,
          status: { $ne: CustomerStatus.DELETED },
        },
        { name: 1, password: 1, status: 1 },
      )
      .exec(); // second argument is a projection;; it asks the query to return only memberNick and memberPassword.
    if (!customer) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);
    else if (customer.status === CustomerStatus.BLOCKED) {
      throw new Errors(HttpCode.FORBIDDEN, Message.BLOCKED_USER);
    }

    const isMatch = await bcrypt.compare(input.password, customer.password); // Compares the submitted password with the stored hash. It does not decrypt the hash; bcrypt checks whether they match.

    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }

    return await this.customerModel.findById(customer._id).lean().exec();
  }

  public async getCustomerDetail(customer: Customer): Promise<Customer> {
    const customerId = shapeIntoMongooseObjectId(customer._id);
    const result = await this.customerModel
      .findOne({ _id: customerId, status: CustomerStatus.ACTIVE })
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async updateCustomer(
    customer: Customer,
    input: CustomerUpdateInput,
  ): Promise<Customer> {
    const customerId = shapeIntoMongooseObjectId(customer._id);
    const result = await this.customerModel
      .findOneAndUpdate({ _id: customerId }, input, { new: true })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    return result;
  }

  public async getTopCustomers(): Promise<Customer[]> {
    const result = await this.customerModel
      .find({
        status: CustomerStatus.ACTIVE,
        points: { $gte: 1 },
      })
      .sort({ points: -1 })
      .limit(4)
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async addUserPoint(
    customer: Customer,
    point: number,
  ): Promise<Customer> {
    const customerId = shapeIntoMongooseObjectId(customer._id);

    return await this.customerModel
      .findOneAndUpdate(
        {
          _id: customerId,
          customerType: CustomerType.CUSTOMER,
          status: CustomerStatus.ACTIVE,
        },
        { $inc: { points: point } },
        { new: true },
      )
      .exec();
  }

  /* BSSR */

  public async processSignup(input: CustomerInput): Promise<Customer> {
    const exist = await this.customerModel
      .findOne({ customerType: CustomerType.ADMIN })
      .exec();
    console.log("exist:", exist);
    if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);

    const salt = await bcrypt.genSalt();
    input.password = await bcrypt.hash(input.password, salt);

    try {
      const result = await this.customerModel.create(input);
      result.password = "";
      return result;
    } catch (err) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public async processLogin(input: LoginInput): Promise<Customer> {
    const customer = await this.customerModel
      .findOne({ name: input.name }, { name: 1, password: 1 })
      .exec();
    if (!customer) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);

    // const isMatch = input.memberPassword === member.memberPassword;
    const isMatch = await bcrypt.compare(input.password, customer.password);

    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }

    return await this.customerModel.findById(customer._id).exec();
  }

  public async getCustomers(): Promise<Customer[]> {
    const result = await this.customerModel
      .find({ customerType: CustomerType.CUSTOMER })
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async updateChosenCustomer(
    input: CustomerUpdateInput,
  ): Promise<Customer> {
    input._id = shapeIntoMongooseObjectId(input._id);
    const result = await this.customerModel
      .findByIdAndUpdate({ _id: input._id }, input, { new: true })
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    return result;
  }
}

export default CustomerService;
