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
