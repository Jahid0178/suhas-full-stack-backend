import dotenv from "dotenv";

dotenv.config();

interface Config {
  PORT: number;
  nodeEnv: string;
}

const config: Config = {
  PORT: parseInt(process.env.PORT as string) || 7000,
  nodeEnv: (process.env.NODE_ENV as string) || "development",
};

export default config;
