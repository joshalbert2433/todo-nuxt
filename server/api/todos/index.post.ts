import { TodoSchema } from "../../validation";
import Todos from "../../models/Todos";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	console.log(body);

	try {
		const validatedData = await TodoSchema.validate(body);
		// Validation passed, use the validatedData
		// ...

		const newTodo = new Todos({
			title: body.title,
		});

		await newTodo.save();

		return newTodo;
	} catch (error: any) {
		// Validation failed, handle the error
		throw createError({ statusCode: 404, statusMessage: error.message });
	}
});
