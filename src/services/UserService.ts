import axios from "axios";
import { config } from "../configs";

const { USER_SERVICE } = config.serviceURIs;

const { USER_SERVICE_PUBLIC_KEY, USER_SERVICE_APP_ID } = config.serviceKeys;

export const verifyToken = async (token: string) => {
  //TODO: implement caching here
  // const user = getFromCache(token);
  // if (user) {
  //   return user;
  // }

  var config = {
    method: "get",
    url: USER_SERVICE + "/user",
    headers: {
      Authorization: `Bearer ${token}`,
      appid: USER_SERVICE_APP_ID,
      authpublickey: USER_SERVICE_PUBLIC_KEY,
    },
  };
  try {
    const req = await axios(config);
    //   setToCache(token, {
    //     success: true,
    //     ...req.data,
    //   });
    return {
      success: true,
      ...req.data,
    };
  } catch (err: any) {
    console.log(err?.response);
    return {
      success: false,
      message: err?.response?.data?.message || "Unauthorized User ",
    };
  }
};

export const loginUser = async (email: string, password: string) => {
  var config = {
    method: "post",
    url: USER_SERVICE + "/user/login",
    headers: {
      appid: USER_SERVICE_APP_ID,
      authpublickey: USER_SERVICE_PUBLIC_KEY,
    },
    data: {
      email,
      password,
    },
  };
  try {
    const req = await axios(config);
    return {
      success: true,
      ...req.data,
    };
  } catch (err: any) {
    return {
      success: false,
      ...err.response.data,
    };
  }
};

export const registerUser = async (payload: any) => {
  var config = {
    method: "post",
    url: USER_SERVICE + "/user/register",
    headers: {
      appid: USER_SERVICE_APP_ID,
      authpublickey: USER_SERVICE_PUBLIC_KEY,
    },
    data: payload
  };
  try {
    const req = await axios(config);
    return {
      success: true,
      ...req.data,
    };
  } catch (err: any) {
    return {
      success: false,
      ...err.response.data,
    };
  }
};
export const getUser = async (userID: string) => {
  var config = {
    method: "get",
    url: USER_SERVICE + `/api/admin/user/${userID}`,
    headers: {
      appid: USER_SERVICE_APP_ID,
      authpublickey: USER_SERVICE_PUBLIC_KEY,
    },
  };
  try {
    const req = await axios(config);
    return {
      success: true,
      ...req.data,
    };
  } catch (err: any) {
    console.log(err?.response);
    return {
      success: false,
      message: err?.response?.data?.message || "Unauthorized User ",
    };
  }
};

