import { PrismaClient } from "@prisma/client";
import { ReserveDto } from "../dto/booking.dto";
import AppError from "../utils/AppError";

export class BookingService {
	private prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	async reserve(dto: ReserveDto) {
		const event = await this.prisma.events.findUnique({
			where: { id: dto.event_id },
			include: { bookings: true },
		});

		if (!event) {
			throw new AppError("Мероприятие не найдено", 404);
		}

		if (event.bookings.length >= event.totalSeats) {
			throw new AppError("Нет свободных мест", 400);
		}

		const existingBooking = await this.prisma.booking.findUnique({
			where: {
				eventId_userId: {
					eventId: dto.event_id,
					userId: dto.user_id,
				},
			},
		});

		if (existingBooking) {
			throw new AppError(
				"Пользователь уже забронировал место на это мероприятие",
				409,
			);
		}

		const booking = await this.prisma.booking.create({
			data: {
				eventId: dto.event_id,
				userId: dto.user_id,
			},
		});

		return booking;
	}
}
