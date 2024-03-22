import { validationResult } from "express-validator";
import { v4 as uuidv4 } from 'uuid';


export const WrapHandler = (controllerFn) => {
  return async (req, res, next) => {
    try {
      await controllerFn(req, res, next);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  };
};
export const WrapValidationHandler = (controllerFn) => {
  return async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      await controllerFn(req, res, next);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  };
};

export const generateID = (prefix = "") => {
  const timestamp = new Date().getTime().toString(); // get current timestamp as string
  const random = Math.random().toString().substr(2, 5); // generate a random string of length 5
  const userId = timestamp + random; // concatenate the timestamp and random strings
  return prefix+generateRandomString(7) + userId + generateRandomString(5);
};
const generateRandomString = (length = 7) => {
  const uuid =  uuidv4();
  return uuid.substr(0, length);
};
