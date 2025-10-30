import { body, query } from "express-validator";

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

export const getTopValidator = [
	query("startDate")
		.exists()
		.withMessage("startDate обязателен")
		.bail()
		.isISO8601()
		.withMessage("startDate должен быть в формате YYYY-MM-DD"),
	query("endDate")
		.exists()
		.withMessage("endDate обязателен")
		.bail()
		.isISO8601()
		.withMessage("endDate должен быть в формате YYYY-MM-DD"),
];
