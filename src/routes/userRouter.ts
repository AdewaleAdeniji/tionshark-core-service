import { Router } from "express";
import { loginValidator, registerValidator } from "../validators/org";
import { LoginUserHandler, RegisterUserHandler } from "../controllers/UserController";

const userRouter = Router();

userRouter.get("/health", (req, res) => {
  return res.status(200).send({ message: "User Service up" });
});
userRouter.post("/login", loginValidator, LoginUserHandler)
userRouter.post("/register", registerValidator, RegisterUserHandler)
export default userRouter;