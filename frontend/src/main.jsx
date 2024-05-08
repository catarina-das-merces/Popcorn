import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage.jsx";
import MoviePage from "./Pages/Movies/MoviePage.jsx";
import Login from "./Pages/Login/Login.jsx";
import Signup from "./Pages/Login/Signup.jsx";
import Root from "./components/Layout/Root/Root.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { MovieProvider } from "./Context/MovieContext.jsx";
import AdminDashboard from "./Pages/Admin/AdminDashboard.jsx";
import AdminLogin from "./Pages/Admin/Login/AdminLogin.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<Root>
				<Homepage />
			</Root>
		),
	},
	{
		path: "/movie/:id",
		element: (
			<Root>
				<MoviePage />
			</Root>
		),
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/signup",
		element: <Signup />,
	},
	{
		path: "/admin",
		element: <AdminLogin />,
	},
	{
		path: "/dashboard",
		element: <AdminDashboard />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<>
		<AuthProvider>
			<MovieProvider>
				<RouterProvider router={router} />
			</MovieProvider>
		</AuthProvider>
	</>
);
