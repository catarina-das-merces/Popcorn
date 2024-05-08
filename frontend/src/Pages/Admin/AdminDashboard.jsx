import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import styles from "./AdminDashboard.module.css";
import UserAdmin from "./UsersAdmin/UserAdmin";
import MovieAdmin from "./MovieAdmin/MovieAdmin";

function AdminDashboard() {
	const { AdminLogout, userAuthorization } = useContext(AuthContext);
	const isAdmin = userAuthorization;

	return (
		<div className={styles.dashboard_container}>
			{isAdmin ? (
				<>
					<div>
						<div className={styles.welcome_logoutbtn}>
							<h1 className={styles.dashboard_header}>ADMIN Dashboard</h1>
							<div>
								<Link to="/">
									<button className={styles.logout_button}>Homepage</button>
								</Link>
								<button
									className={styles.logout_button}
									onClick={() => AdminLogout()}
								>
									Logout
								</button>
							</div>
						</div>
					</div>
					<UserAdmin />
					<MovieAdmin />
				</>
			) : (
				<div className={styles.not_authorized}>
					<p>You do not have permission to access this page</p>
				</div>
			)}
		</div>
	);
}

export default AdminDashboard;
