import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { config } from "./configs";
import deviceRouter from "./routes/deviceRouter";
import { ValidateUserToken } from "./middlewares/userServiceMiddleware";
import orgRouter from "./routes/orgRouter";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter";

const cors = require("cors");

const app = express();
const port = config.app.PORT;

//configs
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));


//routes
app.use("/user", userRouter)
app.use("/devices", ValidateUserToken, deviceRouter)
app.use('/organizations', ValidateUserToken, orgRouter)

app.use("/userpath", (req, res) => {
    console.log(req.path);
    // return res.send({
    //     "firstName":"feranmi",
    //     "lastName":"adebisi",
    //     "email":"adebisi@adeniji.com",
    //     "userID":"newidnewid"
    // });
    res.send({
        "firstName":"feranmi",
        "lastName":"adebisi",
        "email":"adebisi@adeniji.com",
        "userID":"ejdkdkdkdidiek"
    });
});
// handle malformed json body
app.use((err: any, req: Request, res: Response, next: any) => {
    if (err) {
        res.status(400).send("Invalid JSON payload passed.");
    }
    next();
});




// handle 404s
app.use((req: Request, res: Response) => {
    return res.status(404).send({
        message: "URL Not found",
    });
});

mongoose.connect(config.db.MONGO_URI, {
    dbName: config.db.DB_NAME,
})
.then(() => console.log("connected to mongodb"))
.catch(() => console.log("error occured connecting to mongodb"));


app.listen(port, () => {
  console.log(`Message service listening at ${port}`);
});