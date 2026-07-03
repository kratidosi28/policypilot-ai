import dotenv from "dotenv";

dotenv.config();

const requiredEnvironmentVariables = ["DATABASE_URL"] as const;
for (const variableName of requiredEnvironmentVariables) {
  if (!process.env[variableName]) {
    throw new Error(`${variableName} is missing in the .env file`);
  }
}

export const env = {
  port: Number(process.env.PORT) || 5000,
  databaseUrl: process.env.DATABASE_URL,
};
