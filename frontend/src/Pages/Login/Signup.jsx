import React, { useContext, useState } from "react";
import styles from "./Signup.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const Signup = () => {
	const { handleSubmit } = useContext(AuthContext);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		if (!validateEmail(email)) {
			setErrorMessage("Invalid email address.");
			return;
		}
		if (!validatePassword(password)) {
			setErrorMessage("Password must be at least 8 characters long.");
			return;
		}
		try {
			await handleSubmit(name, email, password, "USER");
			setSuccessMessage("User created successfully!");
			setName("");
			setEmail("");
			setPassword("");
		} catch (error) {
			setErrorMessage("Failed to create user.");
		}
	};

	const validateEmail = (email) => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	};

	const validatePassword = (password) => {
		return password.length >= 8;
	};

	return (
		<>
			<Link to="/login" className={styles.home_arrow}>
				<img src="src/assets/icons8-arrow-50.png" alt="" />{" "}
			</Link>
			<div className={styles.signup}>
				<div className={styles.signup_content}>
					<Link style={{ textDecoration: "none" }} to="/">
						<h1 className={styles.logo}>POPCORN 🍿</h1>
					</Link>
					<form className={styles.signup_form} onSubmit={handleFormSubmit}>
						<input
							className={styles.signup_input}
							autoComplete="ON"
							type="text"
							name="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							placeholder="Name"
						/>
						<input
							className={styles.signup_input}
							autoComplete="ON"
							type="email"
							name="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							size="30"
							required
							placeholder="Email Address"
						/>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							minLength="8"
							required
							placeholder="Password"
							name="password"
							className={styles.signup_input}
						/>
						<button type="submit" className={styles.signup_btn}>
							Create Account
						</button>
					</form>
					{successMessage && (
						<p className={styles.success_message}>{successMessage}</p>
					)}
					{errorMessage && (
						<p className={styles.error_message}>{errorMessage}</p>
					)}
				</div>
			</div>
		</>
	);
};

export default Signup;
