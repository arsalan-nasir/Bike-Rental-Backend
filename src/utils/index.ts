import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(6);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};

export const checkPassword = async (
  hashedPassword: string,
  password: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};
