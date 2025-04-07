import React, { createContext, useState, useEffect } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
	const [movies, setMovies] = useState([]);
	const [newMovieDataCreate, setNewMovieDataCreate] = useState({
		title: "",
		description: "",
		genre: "",
		year: "",
		image: null,
		trailer: "",
	});
	const [selectedMovie, setSelectedMovie] = useState("");
	const [updateFormData, setUpdateFormData] = useState({
		updateTitle: "",
		updateDescription: "",
		updateGenre: "",
		updateYear: "",
		updateImage: null,
		updateTrailer: "",
	});
	const [showCreateForm, setShowCreateForm] = useState(false);
	const [showUpdateForm, setShowUpdateForm] = useState(false);

	useEffect(() => {
		fetchMovies();
	}, []);

	const fetchMovies = async () => {
		try {
			const accessToken = localStorage.getItem("token");
			const response = await fetch(
				"https://popcorn-backend-bdos.onrender.com/api/movies",
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			if (!response.ok) {
				throw new Error("Failed to fetch movies");
			}
			const moviesData = await response.json();
			setMovies(moviesData);
			// console.log(moviesData);
		} catch (error) {
			// console.error("Error fetching movies:", error);
		}
	};

	const handleCreateMovie = async (event) => {
		event.preventDefault();
		try {
			const accessToken = localStorage.getItem("token");
			const formData = new FormData();
			formData.append("title", newMovieDataCreate.title);
			formData.append("description", newMovieDataCreate.description);
			formData.append("year", newMovieDataCreate.year);
			formData.append("genre", newMovieDataCreate.genre);
			formData.append("image", newMovieDataCreate.image);
			formData.append("trailer", newMovieDataCreate.trailer);

			const response = await fetch(
				"https://popcorn-backend-bdos.onrender.com/api/movies",
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					body: formData,
				}
			);

			if (response.ok) {
				setNewMovieDataCreate({
					title: "",
					description: "",
					genre: "",
					year: "",
					image: null,
					trailer: "",
				});
				alert("Movie created successfully!");
				fetchMovies();
				setShowCreateForm(false);
			} else {
				throw new Error("Error creating movie");
			}
		} catch (error) {
			alert("Error creating movie!");
			console.error("Error:", error);
		}
	};

	const handleSelectMovie = (movieId) => {
		const movie = movies.find((m) => m._id === movieId);
		if (movie) {
			setSelectedMovie(movie);
			setUpdateFormData({
				updateTitle: movie.title,
				updateDescription: movie.description,
				updateYear: movie.year,
				updateGenre: movie.genre,
				updateImage: null,
				updateTrailer: movie.trailer,
			});
			setShowUpdateForm(true);
		}
	};

	const handleUpdateFormDataChange = (event, fieldName) => {
		if (event.target.type === "file") {
			const file = event.target.files[0];
			setUpdateFormData({
				...updateFormData,
				[fieldName]: file,
			});
		} else {
			setUpdateFormData({
				...updateFormData,
				[fieldName]: event.target.value,
			});
		}
	};

	const handleUpdateMovie = async (event) => {
		event.preventDefault();
		try {
			const accessToken = localStorage.getItem("token");
			const formData = new FormData();
			formData.append("title", updateFormData.updateTitle);
			formData.append("description", updateFormData.updateDescription);
			formData.append("year", updateFormData.updateYear);
			formData.append("genre", updateFormData.updateGenre);
			formData.append("image", updateFormData.updateImage);
			formData.append("trailer", updateFormData.updateTrailer);

			const response = await fetch(
				`https://popcorn-backend-bdos.onrender.com/api/movies/${selectedMovie._id}`,
				{
					method: "PUT",
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					body: formData,
				}
			);
			if (response.ok) {
				alert("Movie updated successfully!");
				setUpdateFormData({
					updateTitle: "",
					updateDescription: "",
					updateYear: "",
					updateGenre: "",
					updateImage: null,
					updateTrailer: "",
				});
				fetchMovies();
				setShowUpdateForm(false);
			} else {
				throw new Error("Error updating movie");
			}
		} catch (error) {
			alert("Error updating movie!");
			console.error("Error:", error);
		}
	};

	const handleDeleteMovie = async (movieId) => {
		try {
			const accessToken = localStorage.getItem("token");
			const movie = movies.find((m) => m._id === movieId);
			const response = await fetch(
				`https://popcorn-backend-bdos.onrender.com/api/movies/${movieId}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			if (response.ok) {
				alert("Movie deleted successfully!");
				fetchMovies();
			} else {
				throw new Error("Failed to delete movie");
			}
		} catch (error) {
			console.error("Error deleting movie:", error);
		}
	};

	const handleCreateButtonClick = () => {
		setShowCreateForm(true);
	};

	const handleCloseForm = () => {
		setShowUpdateForm(false);
		setShowCreateForm(false);

		setNewMovieDataCreate({
			title: "",
			description: "",
			genre: "",
			year: "",
			image: null,
			trailer: "",
		});
		setUpdateFormData({
			updateTitle: "",
			updateDescription: "",
			updateGenre: "",
			updateYear: "",
			updateImage: null,
			updateTrailer: "",
		});
	};

	const rateMovie = async (movieId, rating) => {
		try {
			const accessToken = localStorage.getItem("token");
			const movie = movies.find((m) => m._id === movieId);
			if (!movie) {
				throw new Error("Movie not found");
			}
			const response = await fetch(
				`https://popcorn-backend-bdos.onrender.com/api/movies/${movieId}/rate`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
					body: JSON.stringify({ rating }),
				}
			);
			if (!response.ok) {
				throw new Error("Failed to rate movie");
			}
			fetchMovies();
		} catch (error) {
			console.error("Error rating movie:", error);
			alert("Error rating movie!");
		}
	};

	return (
		<MovieContext.Provider
			value={{
				movies,
				fetchMovies,
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
				rateMovie,
			}}
		>
			{children}
		</MovieContext.Provider>
	);
};
