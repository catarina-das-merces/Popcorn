import React, { useContext } from "react";
import styles from "./MovieAdmin.module.css";
import { MovieContext } from "../../../Context/MovieContext";

function MovieAdmin() {
	const {
		movies,
		setNewMovieDataCreate,
		handleCreateMovie,
		handleSelectMovie,
		handleUpdateFormDataChange,
		handleUpdateMovie,
		handleDeleteMovie,
		handleCreateButtonClick,
		handleCloseForm,
		showCreateForm,
		showUpdateForm,
		updateFormData,
		newMovieDataCreate,
	} = useContext(MovieContext);

	return (
		<>
			<div className={styles.movie_dashboard}>
				{/* Create movie */}
				{showCreateForm && (
					<form
						className={`${styles.form_container} ${styles.create_form}`}
						onSubmit={handleCreateMovie}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							className={styles.close_form}
							onClick={handleCloseForm}
						>
							<g clipPath="url(#clip0_3_120)">
								<path
									d="M18.75 5.25L5.25 18.75"
									stroke="#333333"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M18.75 18.75L5.25 5.25"
									stroke="#333333"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</g>
							<defs>
								<clipPath id="clip0_3_120">
									<rect width="24" height="24" fill="white" />
								</clipPath>
							</defs>
						</svg>
						<h2>Create Movie</h2>
						<input
							className={styles.form_input}
							type="text"
							id="title"
							placeholder="Title"
							autoComplete="ON"
							required
							value={newMovieDataCreate.title}
							onChange={(e) =>
								setNewMovieDataCreate({
									...newMovieDataCreate,
									title: e.target.value,
								})
							}
						/>
						<input
							className={styles.form_input}
							type="text"
							id="description"
							placeholder="Description"
							required
							value={newMovieDataCreate.description}
							onChange={(e) =>
								setNewMovieDataCreate({
									...newMovieDataCreate,
									description: e.target.value,
								})
							}
						/>
						<input
							className={styles.form_input}
							type="text"
							id="genre"
							placeholder="Genre"
							required
							value={newMovieDataCreate.genre}
							onChange={(e) =>
								setNewMovieDataCreate({
									...newMovieDataCreate,
									genre: e.target.value,
								})
							}
						/>
						<input
							className={styles.form_input}
							type="string"
							id="year"
							placeholder="Year"
							required
							value={newMovieDataCreate.year}
							onChange={(e) =>
								setNewMovieDataCreate({
									...newMovieDataCreate,
									year: e.target.value,
								})
							}
						/>
						<input
							className={styles.form_input}
							type="string"
							id="trailer"
							placeholder="Trailer"
							required
							value={newMovieDataCreate.trailer}
							onChange={(e) =>
								setNewMovieDataCreate({
									...newMovieDataCreate,
									trailer: e.target.value,
								})
							}
						/>
						<input
							className={styles.form_input}
							type="file"
							id="image"
							accept="image/*"
							required
							onChange={(e) =>
								setNewMovieDataCreate({
									...newMovieDataCreate,
									image: e.target.files[0],
								})
							}
						/>

						<button className={styles.form_btn}>Create Movie</button>
					</form>
				)}

				{/* Display Movies */}
				<div className={styles.form_container}>
					<div className={styles.display_title}>
						<h2>Movies</h2>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="30"
							height="30"
							viewBox="0 0 24 24"
							fill="none"
							className={styles.create_svg}
							onClick={handleCreateButtonClick}
						>
							<g clipPath="url(#clip0_3_63)">
								<path
									d="M3.75 12H20.25"
									stroke="#333"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M12 3.75V20.25"
									stroke="#333"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</g>
							<defs>
								<clipPath id="clip0_3_63">
									<rect width="24" height="24" fill="white" />
								</clipPath>
							</defs>
						</svg>
					</div>
					<div className={styles.categories}>
						<h3>IMAGE</h3>
						<h3>TITLE</h3>
						<h3>DESCRIPTION</h3>
						<h3 className={styles.media_input}>GENRE</h3>
						<h3 className={styles.media_input}>YEAR</h3>
						<h3 className={styles.media_input}>TRAILER</h3>
						<h3 className={styles.media_input}>RATING</h3>
						<h3>ACTIONS</h3>
					</div>
					<div>
						{movies.map((movie) => (
							<div className={styles.api_movies} key={movie._id}>
								<img
									className={styles.movie_img}
									src={`https://popcorn-backend-jc0e.onrender.com/${movie.image}`}
								/>
								<p>{movie.title}</p>
								<p className={styles.description}>{movie.description}</p>
								<p className={styles.media_input}>{movie.genre}</p>
								<p className={styles.media_input}>{movie.year}</p>
								<p className={styles.media_input}>{movie.trailer}</p>
								<p className={`${styles.rate} ${styles.media_input}`}>
									{movie.rating.rate}
								</p>
								<div className={styles.actions}>
									<svg
										className={styles.update_svg}
										onClick={() => handleSelectMovie(movie._id)}
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
									>
										<g clipPath="url(#clip0_3_186)">
											<path
												d="M11.25 11.25C11.4489 11.25 11.6397 11.329 11.7803 11.4697C11.921 11.6103 12 11.8011 12 12V15.75C12 15.9489 12.079 16.1397 12.2197 16.2803C12.3603 16.421 12.5511 16.5 12.75 16.5"
												stroke="#333"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M11.625 8.8125C12.1428 8.8125 12.5625 8.39277 12.5625 7.875C12.5625 7.35723 12.1428 6.9375 11.625 6.9375C11.1072 6.9375 10.6875 7.35723 10.6875 7.875C10.6875 8.39277 11.1072 8.8125 11.625 8.8125Z"
												fill="#333"
											/>
											<path
												d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
												stroke="#333"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</g>
										<defs>
											<clipPath id="clip0_3_186">
												<rect width="24" height="24" fill="white" />
											</clipPath>
										</defs>
									</svg>
									<svg
										className={styles.delete_svg}
										onClick={() => handleDeleteMovie(movie._id)}
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
									>
										<g clipPath="url(#clip0_3_129)">
											<path
												d="M20.25 5.25H3.75"
												stroke="#333"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M9.75 9.75V15.75"
												stroke="#333"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M14.25 9.75V15.75"
												stroke="#333"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M18.75 5.25V19.5C18.75 19.6989 18.671 19.8897 18.5303 20.0303C18.3897 20.171 18.1989 20.25 18 20.25H6C5.80109 20.25 5.61032 20.171 5.46967 20.0303C5.32902 19.8897 5.25 19.6989 5.25 19.5V5.25"
												stroke="#333"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M15.75 5.25V3.75C15.75 3.35218 15.592 2.97064 15.3107 2.68934C15.0294 2.40804 14.6478 2.25 14.25 2.25H9.75C9.35218 2.25 8.97064 2.40804 8.68934 2.68934C8.40804 2.97064 8.25 3.35218 8.25 3.75V5.25"
												stroke="#333"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</g>
										<defs>
											<clipPath id="clip0_3_129">
												<rect width="24" height="24" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Update movie */}
				{showUpdateForm && (
					<form
						className={`${styles.form_container} ${styles.update_form}`}
						onSubmit={handleUpdateMovie}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							className={styles.close_form}
							onClick={handleCloseForm}
						>
							<g clipPath="url(#clip0_3_120)">
								<path
									d="M18.75 5.25L5.25 18.75"
									stroke="#333333"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M18.75 18.75L5.25 5.25"
									stroke="#333333"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</g>
							<defs>
								<clipPath id="clip0_3_120">
									<rect width="24" height="24" fill="white" />
								</clipPath>
							</defs>
						</svg>
						<h2>Update Movie</h2>
						<input
							className={styles.form_input}
							type="text"
							id="updateTitle"
							placeholder="Title"
							value={updateFormData.updateTitle}
							onChange={(event) =>
								handleUpdateFormDataChange(event, "updateTitle")
							}
							required
						/>
						<input
							className={styles.form_input}
							type="text"
							id="updateDescription"
							placeholder="Description"
							value={updateFormData.updateDescription}
							onChange={(event) =>
								handleUpdateFormDataChange(event, "updateDescription")
							}
							required
						/>
						<input
							className={styles.form_input}
							type="number"
							id="updateYear"
							placeholder="Year"
							value={updateFormData.updateYear}
							onChange={(event) =>
								handleUpdateFormDataChange(event, "updateYear")
							}
							required
						/>
						<input
							className={styles.form_input}
							type="text"
							id="updateGenre"
							placeholder="Genre"
							value={updateFormData.updateGenre}
							onChange={(event) =>
								handleUpdateFormDataChange(event, "updateGenre")
							}
							required
						/>
						<input
							className={styles.form_input}
							type="text"
							id="updateTrailer"
							placeholder="Trailer"
							value={updateFormData.updateTrailer}
							onChange={(event) =>
								handleUpdateFormDataChange(event, "updateTrailer")
							}
							required
						/>
						<input
							className={styles.form_input}
							type="file"
							id="updateImage"
							accept="image/*"
							onChange={(event) =>
								handleUpdateFormDataChange(event, "updateImage")
							}
						/>
						<button className={styles.form_btn}>Update Movie</button>
					</form>
				)}
			</div>
		</>
	);
}

export default MovieAdmin;
