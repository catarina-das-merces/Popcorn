import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import Card from "../../components/Card/Card";
import { MovieContext } from "../../Context/MovieContext";

const Homepage = () => {
	const { movies, fetchMovies } = useContext(MovieContext);
	const [users, setUsers] = useState([]);
	const [userLogged, setUserLogged] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(6);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredMovies, setFilteredMovies] = useState([]);
	const [sortDirection, setSortDirection] = useState("asc"); // Estado para rastrear a direção da ordenação
	const pageTopRef = useRef();

	useEffect(() => {
		const storedUser = localStorage.getItem("token");
		if (storedUser) {
			fetchUsers();
			setUserLogged(true);
		}
	}, []);

	async function fetchUsers() {
		try {
			const accessToken = localStorage.getItem("token");
			const response = await fetch(
				"https://popcorn-backend-jc0e.onrender.com/auth/users",
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error("Failed to fetch users");
			}
			const usersData = await response.json();
			setUsers(usersData);
		} catch (error) {
			console.error("Error fetching users:", error);
			setUserLogged(false);
		}
	}

	useEffect(() => {
		if (userLogged) {
			const indexOfLastItem = currentPage * itemsPerPage;
			const indexOfFirstItem = indexOfLastItem - itemsPerPage;
			const currentMovies = movies.slice(indexOfFirstItem, indexOfLastItem);
			setFilteredMovies(currentMovies);
		} else {
			setFilteredMovies([]);
		}
	}, [userLogged, movies, currentPage, itemsPerPage]);

	useEffect(() => {
		if (pageTopRef.current) {
			pageTopRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [currentPage]);

	const handleNextPage = () => {
		setCurrentPage((prevPage) => prevPage + 1);
	};

	const handlePrevPage = () => {
		setCurrentPage((prevPage) => prevPage - 1);
	};

	const handleSortByYear = () => {
		// Realiza a ordenação dependendo da direção atual
		const sortedMovies = [...movies].sort((a, b) => {
			if (sortDirection === "asc") {
				return a.year - b.year;
			} else {
				return b.year - a.year;
			}
		});
		// Alterna a direção da ordenação
		setSortDirection((prevDirection) =>
			prevDirection === "asc" ? "desc" : "asc"
		);
		setFilteredMovies(sortedMovies.slice(0, itemsPerPage));
		setCurrentPage(1);
	};

	const handleSearchChange = (event) => {
		const term = event.target.value;
		setSearchTerm(term);
		const filtered = term
			? movies.filter(
					(movie) =>
						movie.title.toLowerCase().includes(term.toLowerCase()) ||
						movie.genre.toLowerCase().includes(term.toLowerCase())
			  )
			: movies;
		setFilteredMovies(filtered.slice(0, itemsPerPage));
		setCurrentPage(1);
	};

	const redirectToLogin = () => {
		window.location.href = "/login";
	};

	return (
		<>
			<div className={styles.homepage}>
				{!userLogged && (
					<div className={styles.loginMessage}>
						<p>
							You need to be logged in to view movies.
							<br />
							<br />
							Please
							<button onClick={redirectToLogin}>Sign In</button>.
						</p>
					</div>
				)}
				{userLogged && (
					<>
						<div className={styles.filter}>
							<input
								type="text"
								id="search"
								className={styles.search_box}
								placeholder="Search by Name"
								value={searchTerm}
								onChange={handleSearchChange}
							/>
							<button className={styles.sortby_btn} onClick={handleSortByYear}>
								Sort by Year
							</button>
						</div>
						<div className={styles.cards}>
							{filteredMovies.map((movie) => (
								<Link key={movie._id} to={`/movie/${movie._id}`}>
									<div className={styles.card}>
										<Card movie={movie} />
									</div>
								</Link>
							))}
							{filteredMovies.length === 0 && (
								<p>
									No movies available for the selected genre or search term.
								</p>
							)}
						</div>
						<div className={styles.pagination}>
							{currentPage > 1 && (
								<button className={styles.page_btn} onClick={handlePrevPage}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
									>
										<g clipPath="url(#clip0_3_73)">
											<path
												d="M20.25 12H3.75"
												stroke="#333"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M10.5 5.25L3.75 12L10.5 18.75"
												stroke="#333"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</g>
										<defs>
											<clipPath id="clip0_3_73">
												<rect width="24" height="24" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</button>
							)}
							<span>{currentPage}</span>
							{currentPage * itemsPerPage < movies.length && (
								<button className={styles.page_btn} onClick={handleNextPage}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
									>
										<g clipPath="url(#clip0_3_77)">
											<path
												d="M3.75 12H20.25"
												stroke="#333"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M13.5 5.25L20.25 12L13.5 18.75"
												stroke="#333"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</g>
										<defs>
											<clipPath id="clip0_3_77">
												<rect width="24" height="24" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</button>
							)}
						</div>
					</>
				)}
			</div>
			<div ref={pageTopRef} />
		</>
	);
};

export default Homepage;
