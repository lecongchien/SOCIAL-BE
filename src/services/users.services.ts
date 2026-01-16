import User from "~/model/schemas/User.schema";
import databateService from "./databate.services";

class UserService {
  async register(payload: { email: string; password: string }) {
    const { email, password } = payload;
    const result = await databateService.users.insertOne(
      new User({
        email,
        password,
      }),
    );
    return result;
  }
}

const userService = new UserService();
export default userService;
