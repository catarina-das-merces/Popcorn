import React, { useContext } from "react";
import styles from "./UserAdmin.module.css";
import { AuthContext } from "../../../Context/AuthContext";

function UserAdmin() {
	const {
		users,
		newUserDataCreate,
		handleInputChange,
		setNewUserDataCreate,
		newUserDataUpdate,
		setNewUserDataUpdate,
		deleteUser,
		registerNewUser,
		updateUser,
		showCreateForm,
		showUpdateForm,
		handleCloseForm,
		handleCreateButtonClick,
		handleSelectUser,
		setUpdateFormData,
	} = useContext(AuthContext);

	return (
		<>
			<div className={styles.user_dashboard}>
				{/* Create user */}
				{showCreateForm && (
					<form
						className={`${styles.form_container} ${styles.create_form}`}
						onSubmit={registerNewUser}
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
									stroke="#333"
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
						<h2>Create User</h2>
						<input
							className={styles.form_input}
							type="text"
							id="name"
							placeholder="Name"
							value={newUserDataCreate.name}
							onChange={(e) => handleInputChange(e, "create")}
							required
						/>
						<input
							className={styles.form_input}
							type="email"
							id="email"
							placeholder="Email"
							value={newUserDataCreate.email}
							onChange={(e) => handleInputChange(e, "create")}
							required
						/>
						<input
							className={styles.form_input}
							type="password"
							id="password"
							placeholder="Password"
							value={newUserDataCreate.password}
							onChange={(e) => handleInputChange(e, "create")}
							required
						/>
						<select
							className={styles.form_select}
							id="role"
							name="role"
							value={newUserDataCreate.role}
							onChange={(e) => handleInputChange(e, "create")}
						>
							<option value="USER">User</option>
							<option value="ADMIN">Admin</option>
						</select>
						<button className={styles.form_btn}>Create User</button>
					</form>
				)}

				{/* Display users */}
				<div className={styles.form_container}>
					<div className={styles.display_title}>
						<h2>Users</h2>
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
						<h3 className={styles.media_input}>NAME</h3>
						<h3>EMAIL</h3>
						<h3 className={styles.media_input}>ROLE</h3>
						<h3>ACTIONS</h3>
					</div>
					<div className={styles.users}>
						{users.map((user) => (
							<div className={styles.api_users} key={user._id}>
								<p className={styles.media_input}>{user.name}</p>
								<p>{user.email}</p>
								<p className={styles.media_input}>{user.role}</p>
								<div className={styles.actions}>
									<svg
										className={styles.update_svg}
										onClick={() => handleSelectUser(user._id)}
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
										onClick={() => deleteUser(user._id)}
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

				{/* Update user */}
				{showUpdateForm && (
					<form
						className={`${styles.form_container} ${styles.update_form}`}
						onSubmit={updateUser}
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
						<h2>Update User</h2>
						<input
							className={styles.form_input}
							type="text"
							id="updateName"
							placeholder="Name"
							value={newUserDataUpdate.name}
							onChange={(e) =>
								setNewUserDataUpdate({
									...newUserDataUpdate,
									name: e.target.value,
								})
							}
							required
						/>
						<input
							className={styles.form_input}
							type="email"
							id="updateEmail"
							placeholder="Email"
							value={newUserDataUpdate.email}
							onChange={(e) =>
								setNewUserDataUpdate({
									...newUserDataUpdate,
									email: e.target.value,
								})
							}
							required
						/>
						<select
							className={styles.form_select}
							id="role"
							name="role"
							value={newUserDataUpdate.role}
							onChange={(e) =>
								setNewUserDataUpdate({
									...newUserDataUpdate,
									role: e.target.value,
								})
							}
						>
							<option value="USER">User</option>
							<option value="ADMIN">Admin</option>
						</select>
						<button className={styles.form_btn}>Update User</button>
					</form>
				)}
			</div>
		</>
	);
}

export default UserAdmin;
