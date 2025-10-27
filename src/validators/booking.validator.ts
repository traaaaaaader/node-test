import { body } from "express-validator";

export const reserveValidator = [
	body("event_id")
		.isInt({ min: 1 })
		.withMessage("event_id должен быть положительным числом"),
	body("user_id")
		.isString()
		.trim()
		.notEmpty()
		.withMessage("user_id обязателен и должен быть строкой"),
];
