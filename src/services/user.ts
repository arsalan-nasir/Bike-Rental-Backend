import User from "../models/user";
import {
  hashPassword,
  checkPassword,
  generateToken,
  getPaginatedData,
} from "../utils/auth";
import { ICreateUser, ISignIn } from "../dto/request/User";
import { CreateUser, IUser } from "../dto/response/User";
import { Response } from "../dto/response";

const createUser = async (params: ICreateUser) => {
  const { name, email, password, role } = params;

  const userExist = await User.findOne({ email });
  if (userExist) {
    return new Response(400).setMsg("User with this Email Already Exist");
  } else {
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
  }
};

const signIn = async (params: ISignIn) => {
  const { email, password } = params;
  const user = await User.findOne({ email });
  if (!user) {
    return new Response(404).setMsg("Invalid Credentials");
  }

  const passwordCheck = await checkPassword(user.password, password);
  if (passwordCheck) {
    const token = await generateToken(user);
    return new Response(201, {
      data: new CreateUser(user),
      accessToken: token,
    });
  } else {
    return new Response(401).setMsg("Invalid Credentials");
  }
};

const getAllUsers = async (page: string, size: string) => {
  const users = await User.find({});
  const paginatedUsers = getPaginatedData(
    users,
    parseInt(page),
    parseInt(size)
  );
  const modifiedUsers = paginatedUsers.map(
    (user: IUser) => new CreateUser(user)
  );
  return new Response(201, {
    data: modifiedUsers,
  }).setPaginationObject(page, size);
};

export default { createUser, signIn, getAllUsers };
