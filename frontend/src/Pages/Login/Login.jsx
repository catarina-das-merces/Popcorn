import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const Login = () => {
	const { handleLogin, error } = useContext(AuthContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		try {
			await handleLogin(email, password);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div className={styles.login}>
				<div className={styles.login_content}>
					<Link style={{ textDecoration: "none" }} to="/">
						<h1 className={styles.logo}>POPCORN 🍿</h1>
					</Link>
					<form className={styles.login_form} onSubmit={handleFormSubmit}>
						<input
							className={styles.login_input}
							autoComplete="ON"
							type="email"
							id="email"
							value={email}
							placeholder="Email Address"
							onChange={handleEmailChange}
						/>
						<input
							type="password"
							id="pass"
							name="password"
							value={password}
							placeholder="Password"
							className={styles.login_input}
							onChange={handlePasswordChange}
						/>
						<p className={styles.login_psw_option}>Forgotten password?</p>
						{error && <p className={styles.error}>{error}</p>}
						<button type="submit" className={styles.login_btn}>
							Login
						</button>
					</form>
					<h6 className={styles.login_new_option}>New User?</h6>
					<Link
						style={{ textDecoration: "none" }}
						to="/Signup"
						className={styles.create_btn}
					>
						<span>Create account</span>
					</Link>
				</div>
			</div>
		</>
	);
};

export default Login;
