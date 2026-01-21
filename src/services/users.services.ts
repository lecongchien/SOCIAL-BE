import User from "~/model/schemas/User.schema";
import databateService from "./databate.services";
import { RegisterReqBody } from "~/model/requests/User.requests";
import { hashPassword } from "~/utils/crypto";
import { signToken } from "~/utils/jwt";
import { TokenType } from "~/constants/enums";
import { SignOptions } from "jsonwebtoken";

class UserService {
  private signAccessToken(user_id: string) {
    return signToken({
      payload: { user_id, token_type: TokenType.AccessToken },
      options: {
        expiresIn: (process.env.ACCESS_TOKEN_EXPIRES_IN || '15m') as SignOptions['expiresIn'],
      },
    });
  }

  private signRefreshToken(user_id: string) {
    return signToken({
      payload: { user_id, token_type: TokenType.RefreshToken },
      options: {
        expiresIn: (process.env.REFRESH_TOKEN_EXPIRES_IN || '7d') as SignOptions['expiresIn'],
      },
    });
  }

  async register(payload: RegisterReqBody) {
    const result = await databateService.users.insertOne(
      new User({
        ...payload,
        date_of_birth: new Date(payload.date_of_birth),
        password: hashPassword(payload.password),
      }),
    );

    const user_id = result.insertedId.toString();
    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(user_id),
      this.signRefreshToken(user_id),
    ]);
    return { access_token, refresh_token };
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const user = await databateService.users.findOne({ email });
    console.log(user);
    return Boolean(user);
  }
}

const userService = new UserService();
export default userService;
