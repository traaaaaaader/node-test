import { Router } from "express";
import { PrismaClient } from "@prisma/client";

import { BookingController } from "../controllers/booking.controller";
import { BookingService } from "../services/booking.service";

import {
	reserveValidator,
	getTopValidator,
} from "../validators/booking.validator";
import { validateMiddleware } from "../middlewares";

const prisma = new PrismaClient();
const bookingService = new BookingService(prisma);
const bookingController = new BookingController(bookingService);

const router = Router();

router.post(
	"/bookings/reserve",
	reserveValidator,
	validateMiddleware,
	bookingController.reserve,
);

router.get(
	"/bookings/top",
	getTopValidator,
	validateMiddleware,
	bookingController.getTop,
);

export { router as bookingRouter };
