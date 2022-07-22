import User from "../models/user";
import { hashPassword } from "../utils";
import { ICreateUser } from "../dto/request/User";
import { CreateUser } from "../dto/response/User";
import { Response } from "../dto/response";

const createUser = async (params: ICreateUser) => {
  const { name, email, password, role } = params;
  const encryptedPassword = await hashPassword(password);
  const user = new User({
    name,
    email,
    password: encryptedPassword,
    role,
  });

  await user.save();

  const response = new CreateUser(user);

  return new Response(201, response);
};

export default { createUser };
