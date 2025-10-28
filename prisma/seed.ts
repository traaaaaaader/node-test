import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	console.log("Начало заполнения базы данных...");

	const events = await prisma.events.createMany({
		data: [
			{
				name: "Концерт рок-группы",
				totalSeats: 20,
			},
			{
				name: "Стендап шоу",
				totalSeats: 10,
			},
			{
				name: "Театральная постановка",
				totalSeats: 30,
			},
			{
				name: "Кинопоказ",
				totalSeats: 50,
			},
			{
				name: "Мастер-класс по рисованию",
				totalSeats: 5,
			},
		],
	});

	console.log(`Создано мероприятий: ${events.count}`);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
