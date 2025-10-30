import { Request, Response, NextFunction } from "express";
import { BookingService } from "../services/booking.service";
import { TopDto } from "dto/booking.dto";

export class BookingController {
	constructor(private bookingService: BookingService) {}

	reserve = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const booking = await this.bookingService.reserve(req.body);
			res.json(booking);
		} catch (error) {
			next(error);
		}
	};

	getTop = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const query: TopDto = {
				startDate: String(req.query.startDate),
				endDate: String(req.query.endDate),
			};
			const top = await this.bookingService.getTop(query);
			res.json(top);
		} catch (error) {
			next(error);
		}
	};
}
