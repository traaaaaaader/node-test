import { Request, Response, NextFunction } from "express";
import { BookingService } from "../services/booking.service";

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
}
