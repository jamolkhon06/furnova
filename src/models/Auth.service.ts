import Errors, { HttpCode, Message } from "../libs/Errors";
import { AUTH_TIMER } from "../libs/config";
import { Customer } from "../libs/types/customer";
import jwt from "jsonwebtoken";

class AuthService {
  private readonly secretToken;

  constructor() {
    this.secretToken = process.env.SECRET_TOKEN as string;
  }

  public async createToken(payload: Customer) {
    return new Promise((resolve, reject) => {
      const duration = `${AUTH_TIMER}h`;
      jwt.sign(
        payload,
        process.env.SECRET_TOKEN as string,
        { expiresIn: duration },
        (err, token) => {
          if (err)
            reject(
              new Errors(HttpCode.UNAUTHORIZED, Message.TOKEN_CREATION_FAILED),
            );
          else resolve(token as string);
        },
      );
    });
  }

  public async checkAuth(token: string): Promise<Customer> {
    const result: Customer = (await jwt.verify(
      token,
      this.secretToken,
    )) as Customer;
    console.log(`--- [AUTH] memberNick: ${result.name} ---`);
    return result;
  }
}

export default AuthService;
