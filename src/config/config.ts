import dotenv from "dotenv";

dotenv.config();

interface Config {
  PORT: number;
  nodeEnv: string;
  JWT_SECRET: string;
  DATABASE_URL: string;
}

const config: Config = {
  PORT: parseInt(process.env.PORT as string) || 7000,
  nodeEnv: (process.env.NODE_ENV as string) || "development",
  JWT_SECRET: process.env.JWT_SECRET as string,
  DATABASE_URL: process.env.DATABASE_URL as string,
};

export default config;
