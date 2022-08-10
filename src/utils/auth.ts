import bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { Router, Request, Response, NextFunction } from "express";
import { Response as ResponseDTO } from "../dto/response";
import { IUser } from "../dto/response/User";

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

export const generateToken = ({
  email,
  _id,
}: {
  email: string;
  _id: string;
}) => {
  const token = sign(
    { _id: _id?.toString(), email },
    process.env.SECRET_KEY || "Secret Key",
    {
      expiresIn: "1h",
    }
  );
  return token;
};

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization") || null;

    if (!token) {
      throw new Error();
    }
    await verify(token, process.env.SECRET_KEY || "Secret Key");
    next();
  } catch (error) {
    res.status(401).send(new ResponseDTO(401).setMsg("Please authenticate"));
  }
};

export const getPaginatedData = (data: any[], page: number, size: number) => {
  const start = (page - 1) * size;
  const end = page * size;
  return data.slice(start, end);
};
