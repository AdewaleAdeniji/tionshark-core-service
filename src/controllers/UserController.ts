import { loginUser, registerUser } from "../services/UserService";
import { WrapValidationHandler } from "../utils";

export const LoginUserHandler = WrapValidationHandler(async (req: any, res: any) => {
    const { email, password } = req.body;
    try {
      const resp = await loginUser(email, password);
      const requestResponse = {
        code: resp.success ? 200 : 400,
        success: resp.success,
      };
      return res.status(requestResponse.code).json({ ...requestResponse, ...resp });
    } catch (error: any) {
      res.status(400).json({ success: false, ...error.response?.data });
    }
  });
  
export const RegisterUserHandler = WrapValidationHandler(async (req: any, res: any) => {
    const { email, password, firstName, lastName } = req.body;
  
    try {
      var payload = {
        email,
        password,
        firstName,
        lastName,
      };
      const response = await registerUser(payload);
      // setup api ke
      const user = response?.data;
      const requestResponse = {
        code: response.success ? 200 : 400,
        success: response.success,
      };
      console.log(response)
      return res.status(requestResponse.code).json({ ...requestResponse, ...response });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ success: false, ...error.response.data });
    }
  });