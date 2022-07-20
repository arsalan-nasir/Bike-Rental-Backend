import User from "../models/user";

const createUser = async (params: {
  name: String;
  email: String;
  password: String;
  role: String;
}) => {
  const { name, email, password, role } = params;
  const user = new User({
    name,
    email,
    password,
    role,
  });

  await user.save();

  return { status: 200, body: user };
};

export default { createUser };
