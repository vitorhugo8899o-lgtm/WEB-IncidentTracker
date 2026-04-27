import { api } from "./api";

const BASE_URL = import.meta.env.VITE_API_URL;


export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
        const cookieValue = parts.pop().split(';').shift();

        return cookieValue;
    }

    return null;
};


async function GetMetrics() {
    try {
        const endpoint = `${BASE_URL}/api/v1/metrics/me`;

        const response = await fetch(endpoint, {
            method: "GET",
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar métricas");
        }

        return response;
    } catch (error) {
        throw new Error(error.message || "Erro de conexão com o servidor.");
    }
}


async function GetIncidentInvolved() {
    try {
        const response = await api("/api/v1/tech/history_incident/", {
            method: "GET",
            credentials: 'include'
        });
        return response;
    } catch (error) {
        throw new Error(error.message || "Erro ao carregar histórico.");
    }
}


async function GetUser(id_user) {
    try {
        const response = await api(`/api/v1/users/${id_user}`, {
            method: "GET",
            credentials: 'include'
        });

        if (!response) {
            throw new Error("Usuário não encontrado.");
        }

        if (response.ok === false) {
            if (response.status === 404) {
                throw new Error("Usuário não encontrado.");
            }
            throw new Error(`Erro ${response.status} ao buscar usuário.`);
        }
        return response;
    } catch (error) {
        throw new Error(error.message || "Erro ao buscar usuário.");
    }
}


async function DisableUser(id_user) {
    try {
        const response = await api(`/api/v1/disable/user/or/worker/${id_user}`, {
            method: "PUT",
            credentials: 'include'
        })

        if (response.ok === false) {
            if (response.status === 404) {
                throw new Error("Usuário não encontrado.");
            }
            throw new Error(`Erro ${response.status} ao buscar usuário.`);
        }
        return response;
    } catch (error) {
        throw new Error(error.message || "Erro ao buscar usuário.");
    }
}


export { GetMetrics, GetIncidentInvolved, GetUser, DisableUser };