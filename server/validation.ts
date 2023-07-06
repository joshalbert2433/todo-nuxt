import * as Yup from "yup";

export const TodoSchema = Yup.object().shape({
	title: Yup.string().required().min(5),
	completed: Yup.boolean(),
});
