import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
	const [userLogged, setUserLogged] = useState(null);

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUserLogged(JSON.parse(storedUser));
		}
	}, []);

	const handleUserLogOut = () => {
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		setUserLogged(null);
		window.location.reload();
	};

	return (
		<>
			<div className={styles.header}>
				<div className={styles.header_logo}>
					<img src="icons8-popcorn-48.png" alt="" />
				</div>
				<div className={styles.header_name}>
					<Link style={{ textDecoration: "none" }} to="/">
						<h1>POPCORN</h1>
					</Link>
				</div>
				<div className={styles.header_options}>
					{userLogged && (
						<>
							<p className={styles.user_name}>Hi, {userLogged.name}! </p>
							<p onClick={handleUserLogOut}>❌</p>
						</>
					)}
					{!userLogged && (
						<Link to="/login">
							<p>👤</p>
						</Link>
					)}
					<Link to="/admin">
						<p>🔐</p>
					</Link>
				</div>
			</div>
		</>
	);
};

export default Header;
