import { api } from "./api";

async function LoginUser(data) {
	const payload = {
		username: data.email,
		password: data.password,
		grant_type: "password",
		scope: "",
	};

	const formBody = new URLSearchParams(payload).toString();

	try {
		const response = await api("/api/v1/Login", {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			method: "POST",
			body: formBody,
		});
	} catch (error) {
		let errorMessage = "Erro de conexão com o servidor. Tente novamente.";

		if (error.response) {
			const status = error.response.status;
			const detail = error.response.data.detail;

			if (status === 401) {
				errorMessage = "Login ou senha incorretos. Verifique suas credenciais.";
			} else if (detail) {
				errorMessage = detail;
			}
		}
	}
}

async function CreateUser(data) {
	const payload = {
		email: data.email,
		password: data.password,
		cpf: data.cpf,
	};

	const login = {
		email: data.email,
		password: data.password,
	};

	try {
		const response = await api("/api/v1/users", {
			method: "POST",
			body: JSON.stringify(payload),
		});

		await LoginUser({ email: data.email, password: data.password });
		return response;
	} catch (error) {
		throw new Error(error.message || "Erro de conexão com o servidor.");
	}
}

async function DeleteUser(id_user) {
	try {
		const response = await api("/api/v1/users/disable", {
			method: "POST",
			credentials: 'include'
		})

		return response
	} catch (error) {
		throw new Error(error.message || "Erro ao deletar conta.")
	}
}

export { CreateUser, LoginUser, DeleteUser };
