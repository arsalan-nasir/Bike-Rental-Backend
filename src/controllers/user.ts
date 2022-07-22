import { Router, Request, Response } from "express";
import UserService from "../services/user";
const router = Router();

const baseURL = "/api/user";

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const response = await UserService.createUser(req.body);
    res.send(response);
  } catch (error: any) {
    return res.status(500).json(error._message || "Server Error");
  }
});

module.exports = { baseURL, router };
