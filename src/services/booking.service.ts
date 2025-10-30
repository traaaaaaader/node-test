import { PrismaClient } from "@prisma/client";
import type { ReserveDto, TopDto } from "../dto/booking.dto";
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

	async getTop({ startDate, endDate }: TopDto) {
		const start = new Date(startDate);
		const end = new Date(endDate);

		if (isNaN(start.getTime()) || isNaN(end.getTime())) {
			throw new AppError("Неверный формат даты. Используйте YYYY-MM-DD", 400);
		}

		start.setHours(0, 0, 0, 0);
		end.setHours(23, 59, 59, 999);

		if (start > end) {
			throw new AppError("Начальная дата не может быть позже конечной", 400);
		}

		const grouped = await this.prisma.booking.groupBy({
			by: ["userId"],
			_count: { id: true },
			where: {
				createdAt: {
					gte: start,
					lte: end,
				},
			},
		});

		const top = grouped.sort((a, b) => b._count.id - a._count.id).slice(0, 10);

		return top.map((r, i) => ({
			user_id: r.userId,
			place: i + 1,
			booking_count: r._count.id,
		}));
	}
}
