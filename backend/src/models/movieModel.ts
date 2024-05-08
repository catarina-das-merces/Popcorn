import mongoose, { Schema } from "mongoose";

export interface IMovie extends mongoose.Document {
	title: string;
	year: number;
	description: string;
	genre: string;
	image: string;
	trailer: string;
	rating?: {
		rate: number;
		count: number;
	};
}

const MoviesSchema = new Schema({
	title: { type: String, required: true },
	year: { type: Number, required: true },
	description: { type: String, required: true },
	genre: { type: String, required: true },
	image: { type: String, required: true, default: "default.png" },
	trailer: { type: String, required: true },
	rating: {
		rate: { type: Number, default: 0 },
		count: { type: Number, default: 0 },
	},
	createdAt: { type: Date, default: Date.now() },
});

export default mongoose.model<IMovie>("Movie", MoviesSchema);
