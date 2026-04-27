import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/UserCreate.jsx";
import HomeNexusTracker from "./pages/Home.jsx";
import FetchCall from "./pages/FetchCall.jsx";
import ResolverChamado from "./pages/ResolveIncident.jsx";
import MetricsPage from "./pages/TechMetrics.jsx";
import HistoryPage from "./pages/HistoricIncident.jsx";
import UserSearchPage from "./pages/UserSearch.jsx";

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
	},
	{
		path: "/buscar-chamado",
		element: <FetchCall />
	},
	{
		path: "/resolver-chamado",
		element: <ResolverChamado />
	},
	{
		path: "/metricas",
		element: <MetricsPage />
	},
	{
		path: "/historico",
		element: <HistoryPage />
	},
	{
		path: "/buscar-usuario",
		element: <UserSearchPage />
	}
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={routers} />
	</StrictMode>,
);
