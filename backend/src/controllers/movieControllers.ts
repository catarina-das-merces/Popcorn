import { IMovie } from "../interfaces/interfaces.js";
import movieService from "../services/movieService.js";
import { Request, Response } from "express";

const moviesPath = "./src/data/movies.json";

class MovieController {
	async getAllMovies(req: Request, res: Response) {
		const movies = await movieService.getAll();
		return res.json(movies);
	}

	async getMovieById(req: Request, res: Response) {
		try {
			const movie = await movieService.getOne(req.params.id);
			if (!movie) {
				return res.status(404).json({ error: "Movie not found." });
			}
			return res.json(movie);
		} catch (error) {
			console.error("Error getting movie by ID:", error);
			return res.status(500).json({ error: "Internal server error." });
		}
	}

	async createMovie(req: Request, res: Response): Promise<Response> {
		try {
			const newMovie: IMovie = await movieService.create(
				req.body,
				req.files?.image
			);
			return res.status(201).json(newMovie);
		} catch (error) {
			console.error("Error creating movie:", error);
			return res.status(500).json({ error: "Internal server error." });
		}
	}

	async updateMovie(req: Request, res: Response): Promise<Response> {
		const movieId = req.params.id;
		try {
			const updatedMovie = await movieService.update(
				req.body,
				movieId,
				req.files?.image
			);
			if (!updatedMovie) {
				return res.status(404).json({ error: "Movie not found." });
			}
			return res.json(updatedMovie);
		} catch (error) {
			console.error("Error updating movie:", error);
			return res.status(500).json({ error: "Internal server error." });
		}
	}

	async deleteMovie(req: Request, res: Response): Promise<Response> {
		try {
			const movieId = req.params.id;
			const deletedMovie = await movieService.delete(movieId);
			if (!deletedMovie) {
				return res.status(404).json({ error: "Movie not found." });
			}
			return res.json(deletedMovie);
		} catch (error) {
			console.error("Error deleting movie:", error);
			return res.status(500).json({ error: "Internal server error." });
		}
	}

	async rateMovie(req: Request, res: Response): Promise<Response> {
		const movieId = req.params.id;
		const { rating } = req.body;

		if (!rating) {
			return res.status(400).json({
				error: "Invalid rating. Please provide a number between 1 and 5.",
			});
		}

		try {
			const ratedMovie = await movieService.rateMovie(movieId, rating);
			if (!ratedMovie) {
				return res.status(404).json({ error: "Movie not found." });
			}
			return res.json(ratedMovie);
		} catch (error) {
			console.error("Error rating movie:", error);
			return res.status(500).json({ error: "Internal server error." });
		}
	}
}

export default new MovieController();
