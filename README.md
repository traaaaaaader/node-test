# Booking Service

Сервис для бронирования мест на мероприятия.

## Установка и запуск

1. **Запустите Docker Compose:**
   ```bash
   docker-compose up -d
   ```

2. **Примените миграции и заполните базу данных:**
   ```bash
   docker-compose -f docker-compose.migrate.yaml up
   ```

Сервер будет доступен по адресу: `http://localhost:4000`

## API

### POST `/api/bookings/reserve`

Бронирование места на мероприятие.


**Request:**
```json
{
  "event_id": 1,
  "user_id": "user123"
}
```

**Response (200):**
```json
{
  "id": 1,
  "eventId": 1,
  "userId": "user123",
  "createdAt": "2025-10-28T10:30:00.000Z"
}
```

**Ошибки:**
- `400` - Невалидные данные или нет свободных мест
- `404` - Мероприятие не найдено
- `409` - Пользователь уже забронировал место

### GET `/api/bookings/top`

Получение топ 10.

**Request:**
```json
{
  "startDate": "2025-10-10",
  "endDate": "2025-11-10"
}
```

**Response (200):**
```json
{
	[
		{ "user_id": "1", "place": 1, "booking_count": 3 },
		{ "user_id": "2", "place": 2, "booking_count": 2 },
		{ "user_id": "3", "place": 2, "booking_count": 2 },
		{ "user_id": "4", "place": 3, "booking_count": 1 }
	]
}
```

**Ошибки:**
- `400` - Неверный формат даты. Используйте YYYY-MM-DD
- `400` - Начальная дата не может быть позже конечной

## Seed

**Table Events**
| id | name                        | totalSeats |
|----|-----------------------------|------------|
| 1  | Концерт рок-группы          | 20         |
| 2  | Стендап шоу                  | 10         |
| 3  | Театральная постановка       | 30         |
| 4  | Кинопоказ                    | 50        |
| 5  | Мастер-класс по рисованию   | 5          |
