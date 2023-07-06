import mongoose, { ConnectOptions } from "mongoose";

export default defineNitroPlugin(async (nitroApp) => {
	const config = useRuntimeConfig();
	const mongoURI = config.public.MONGO_URI;
	mongoose.set("debug", true);
	try {
		await mongoose.connect(mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		} as ConnectOptions);

		console.log("DB connected");
	} catch (error) {
		console.log(error);
	}
});
