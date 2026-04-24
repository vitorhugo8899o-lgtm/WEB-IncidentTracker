import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/UserCreate.jsx";
import HomeNexusTracker from "./pages/Home.jsx";

const routers = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/Login",
		element: <LoginPage />,
	},
	{
		path: "/contas/criar",
		element: <RegisterPage />,
	},
	{
		path: "/Home",
		element: <HomeNexusTracker />
	}
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={routers} />
	</StrictMode>,
);
