import { TodoSchema } from "../../validation";
import Todos from "../../models/Todos";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	console.log(body);

	try {
		const todoId = event?.context?.params?.id;

		const updatedTodo = await Todos.findByIdAndUpdate(todoId, body, {
			new: true,
		});

		if (!updatedTodo) {
			throw createError({
				statusCode: 404,
				statusMessage: "Todo not found",
			});
		}

		return updatedTodo;
	} catch (error: any) {
		// Validation failed or other error occurred, handle the error
		throw createError({ statusCode: 404, statusMessage: error.message });
	}
});
