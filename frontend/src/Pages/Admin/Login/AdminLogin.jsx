import React, { useContext, useState } from "react";
import styles from "./AdminLogin.module.css";
import { AuthContext } from "../../../Context/AuthContext";
import { Link } from "react-router-dom";

const AdminLogin = () => {
	const { AdminLogin } = useContext(AuthContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await AdminLogin(email, password);
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<>
			<Link to="/" className={styles.home_arrow}>
				<img src="icons8-arrow-left-40.png" alt="" />{" "}
			</Link>
			<div className={styles.admin}>
				<div className={styles.admin_content}>
					<h5>Admin Login</h5>
					<form className={styles.admin_form} onSubmit={handleSubmit}>
						<input
							className={styles.admin_input}
							autoComplete="ON"
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Email Address"
						/>
						<input
							type="password"
							id="pass"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
							className={styles.admin_input}
						/>
						<p className={styles.error}>{error}</p>
						<button type="submit" className={styles.admin_login_btn}>
							Login
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default AdminLogin;
