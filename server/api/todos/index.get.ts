import TodoModel from "../../models/Todos";

export default defineEventHandler(async () => {
	try {
		const result = await TodoModel.find();

		return result;
	} catch (error) {
		console.log(error);
	}
});
