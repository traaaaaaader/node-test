import express from "express";

import { bookingRouter } from "./routes/booking.router";
import { errorMiddleware } from "./middlewares/error.middleware";

import { config } from "./config/config";

const app = express();

app.use(express.json());

app.use("/api", bookingRouter);

app.use(errorMiddleware);

app.listen(config.port, () => {
	console.log(`Server running on http://localhost:${config.port}`);
});
