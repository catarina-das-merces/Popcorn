import React, { useState, useContext, useEffect } from "react";
import styles from "./MoviePage.module.css";
import { useParams } from "react-router-dom";
import { MovieContext } from "../../Context/MovieContext";

const MoviePage = () => {
	const { id } = useParams();
	const { movies, rateMovie } = useContext(MovieContext);
	const [movie, setMovie] = useState(null);
	const [rating, setRating] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [error, setError] = useState(null);
	const [successMessage, setSuccessMessage] = useState("");

	useEffect(() => {
		const selectedMovie = movies.find((movie) => movie._id === id);
		setMovie(selectedMovie);
		console.log(movie);
	}, [id, movies]);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleRatingChange = (value) => {
		setRating(value);
	};

	const handleRateMovie = async () => {
		try {
			await rateMovie(movie._id, rating);
			setSuccessMessage("Classificação bem sucedida!");
		} catch (error) {
			console.error("Erro ao classificar o filme:", error);
			setError("Erro ao classificar o filme");
		}
	};
	if (!movie) {
		return <p>No Movies Found...</p>;
	}

	return (
		<>
			<div className={styles.movie_info}>
				<img
					className={styles.movie_img}
					src={`https://popcorn-website.onrender.com/${movie.image}`}
					alt={movie.title}
				/>
				<div className={styles.desktop_trailer}>
					<iframe
						className={styles.trailer}
						title="Youtube player"
						sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
						src={`https://www.youtube.com/embed/${movie.trailer}`}
						allow="autoplay; encrypted-media"
						loading="lazy"
					></iframe>
				</div>

				<div className={styles.movie_description}>
					<h6 className={styles.genre}>{movie.genre}</h6>
					<h2 className={styles.title}>{movie.title}</h2>
					<div>
						<h6>Sinopse</h6>
						<p className={styles.description}>{movie.description}</p>
					</div>
					<div className={styles.rating}>
						<label htmlFor="rating">Classificação:</label>
						<p>Classificação Atual: {movie.rating.rate}</p>
						<div className={styles.starRating}>
							{[...Array(5)].map((_, index) => {
								const starValue = index + 1;
								return (
									<span
										key={index}
										role="button"
										onClick={() => handleRatingChange(starValue)}
										className={starValue <= rating ? styles.selected : ""}
									>
										⭐️
									</span>
								);
							})}
						</div>
						<button className={styles.rating_btn} onClick={handleRateMovie}>
							Classificar
						</button>
						{successMessage && (
							<p className={styles.success_message}>{successMessage}</p>
						)}
						{error && <p className={styles.error_message}>{error}</p>}
					</div>
					<button className={styles.trailer_btn} onClick={openModal}>
						Trailer
					</button>
				</div>
			</div>
			{isModalOpen && (
				<div className={styles.modal}>
					<div className={styles.modal_content}>
						<span className={styles.close} onClick={closeModal}>
							&times;
						</span>
						<iframe
							className={styles.video}
							title="Youtube player"
							sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
							src={`https://www.youtube.com/embed/${movie.trailer}`}
							allow="autoplay; encrypted-media"
							loading="lazy"
						></iframe>
					</div>
				</div>
			)}
		</>
	);
};

export default MoviePage;
