import { Router, Request, Response } from "express";
import UserService from "../services/user";
import { validateToken } from "../utils/auth";
const router = Router();

const baseURL = "/api/auth";

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const response = await UserService.createUser(req.body);
    return res.status(response.status).json(response);
  } catch (error: any) {
    return res.status(500).json(error._message || "Server Error");
  }
});
router.post("/signin", async (req: Request, res: Response) => {
  try {
    const response = await UserService.signIn(req.body);
    return res.status(response.status).json(response);
  } catch (error: any) {
    console.log({ error });
    return res.status(500).json(error._message || "Server Error");
  }
});

router.get("/users", validateToken, async (req: Request, res: Response) => {
  try {
    const { page, size } = req.query;

    const response = await UserService.getAllUsers(
      (page as string) || "1",
      (size as string) || "10"
    );

    return res.status(response.status).json(response);
  } catch (error: any) {
    return res.status(500).json(error._message || "Server Error");
  }
});
module.exports = { baseURL, router };
