import dotenv from "dotenv";

dotenv.config();

const requiredEnv = ["PORT", "DB_URL"] as const;

requiredEnv.forEach((key) => {
	if (!process.env[key]) {
		throw new Error(`Missing required env variable: ${key}`);
	}
});

export const config = {
	port: Number(process.env.PORT),
	db: {
		url: process.env.DB_URL as string,
	},
};
