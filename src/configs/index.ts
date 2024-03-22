import { config as dotEnvConfig } from "dotenv";

dotEnvConfig();
export const config = {
  app: {
    PORT: process.env.PORT || 5007,
  },
  db: {
    MONGO_URI: process.env.MONGO_URI || "",
    DB_NAME: process.env.DB_NAME || "",
  },
  serviceKeys: {
    USER_SERVICE_APP_ID: process.env.USER_SERVICE_APP_ID || "",
    USER_SERVICE_PRIVATE_KEY: process.env.USER_SERVICE_APP_SECRET || "",
    USER_SERVICE_PUBLIC_KEY: process.env.USER_SERVICE_APP_PUBLIC_KEY || "",
  },
  serviceURIs: {
    MESSAGE_SERVICE: process.env.MESSAGE_SERVICE_URI || "",
    USER_SERVICE: process.env.USER_SERVICE_URI || "",
  },
};
