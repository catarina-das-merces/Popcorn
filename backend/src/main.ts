import express from "express";
import dotenv from "dotenv";
import moviesRouter from "./routers/moviesRouter.js";
import usersRouter from "./routers/usersRouter.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import mongoose, { Connection } from "mongoose";
import SetupSwagger from "./docs/swagger.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO = process.env.MONGO_URI || "";

// ensina json
app.use(express.json());
app.use(cors());
app.use(express.static("static"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
//import user and productss
app.use("/api", moviesRouter);
app.use("/auth", usersRouter);

const startApp = async () => {
	try {
		mongoose.set("strictQuery", true);
		await mongoose.connect(String(MONGO));
		console.log("sucessely connected to database");

		app.listen(PORT, '0.0.0.0', () => {
  console.log(`server is ok ${PORT}`);
});

	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(error.message);
		}
	}
};
SetupSwagger(app);
await startApp();
