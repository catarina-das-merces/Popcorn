import { IMovie } from "../interfaces/interfaces.js";
import fileService from "../utils/fileService.js";
import movieModel from "../models/movieModel.js";

class MovieService {
	async getAll() {
		return await movieModel.find();
	}

	async getOne(movieId: string) {
		return await movieModel.findById(movieId);
	}

	async create(movieData: any, imageFile: any): Promise<IMovie> {
		try {
			const { title, year, description, genre, trailer } = movieData;

			let image = "default-movie.png";
			if (imageFile) {
				image = await fileService.save(imageFile);
			}

			const newMovieData: any = {
				title,
				year,
				description,
				genre,
				image,
				trailer,
			};

			const newMovie = await movieModel.create(newMovieData);

			return newMovie.toObject() as IMovie;
		} catch (error) {
			throw error;
		}
	}

	async update(
		movieData: any,
		movieId: string,
		movieImage: any
	): Promise<IMovie | undefined> {
		try {
			const { title, year, description, genre, trailer } = movieData;

			// Encontre o filme pelo ID
			let updatedMovie = await movieModel.findById(movieId);

			if (!updatedMovie) {
				// Se o filme não existir, retorne undefined
				return undefined;
			}

			// Atualize os campos do filme
			updatedMovie.title = title;
			updatedMovie.year = year;
			updatedMovie.description = description;
			updatedMovie.genre = genre;
			updatedMovie.trailer = trailer;

			// Atualize a imagem somente se uma nova imagem for fornecida
			if (movieImage) {
				// Exclua a imagem existente se não for a imagem padrão
				if (updatedMovie.image !== "default.png") {
					await fileService.delete(updatedMovie.image);
				}
				// Salve a nova imagem e atualize o caminho da imagem no produto
				updatedMovie.image = await fileService.save(movieImage);
			}

			// Salve as alterações no banco de dados
			await updatedMovie.save();

			return updatedMovie.toObject();
		} catch (error) {
			console.error("Error updating movie:", error);
			throw error;
		}
	}

	async delete(movieId: string): Promise<IMovie | undefined> {
		try {
			const deletedMovie = await movieModel.findByIdAndDelete(movieId);

			if (!deletedMovie) {
				return undefined;
			}

			if (deletedMovie.image !== "default-movie.png") {
				await fileService.delete(deletedMovie.image);
			}

			return deletedMovie.toObject(); // Convert the deleted document to a JavaScript object
		} catch (error) {
			console.error("Error deleting movie:", error);
			throw error; // Reject the error so that the controller can handle it
		}
	}

	async rateMovie(
		movieId: string,
		rating: number
	): Promise<IMovie | undefined> {
		try {
			let ratedMovie = await movieModel.findById(movieId);

			if (!ratedMovie) {
				return undefined;
			}

			ratedMovie.rating = ratedMovie.rating || { rate: 0, count: 0 };
			const newRate =
				(ratedMovie.rating.rate * ratedMovie.rating.count + rating) /
				(ratedMovie.rating.count + 1);

			ratedMovie.rating.rate = parseFloat(newRate.toFixed(1));

			ratedMovie.rating.count += 1;

			await ratedMovie.save();

			return ratedMovie.toObject() as IMovie;
		} catch (error) {
			console.error("Error rating movie:", error);
			throw error;
		}
	}
}

export default new MovieService();
