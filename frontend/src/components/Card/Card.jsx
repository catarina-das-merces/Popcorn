import React from "react";
import styles from "./Card.module.css";

const Card = ({ movie }) => {
	if (!movie) {
		return null;
	}

	return (
		<div key={movie._id} className={styles.moviecard}>
			<div className={styles.card_img}>
				{movie.image && (
					<img
						className={styles.movie_img}
						src={`https://popcorn-backend-jc0e.onrender.com/${movie.image}`}
						alt={movie.title}
					/>
				)}
			</div>
			<div className={styles.card_info}>
				<h5>{movie.title}</h5>
				<h6>{movie.genre}</h6>
				<p>{movie.year}</p>
			</div>
		</div>
	);
};

export default Card;
