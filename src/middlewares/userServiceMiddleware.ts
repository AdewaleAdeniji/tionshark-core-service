import { verifyToken } from "../services/UserService";

export const ValidateUserToken = async (req: any, res: any, next: any) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({
            message: "Unauthorized",
        });
    }
    // cut the token from the string
    const tokenString = token.split(" ")[1];
    // call user Service
    const user =  await verifyToken(tokenString);
    // if token is valid, call next
    if (!user.success) {
        return res.status(401).send({ message: "Unauthorized" });
    }
    req.token = tokenString;
    req.user = user;
    req.userID = user.userID;
    return next();
}