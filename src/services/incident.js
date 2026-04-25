import { api } from "./api";


async function CreateIncident(data) {
    const payload = {
        title: data.title,
        description: data.description,
    }

    try {
        const response = await api("/api/v1/incidents", {
            method: "POST",
            credentials: 'include',
            body: JSON.stringify(payload)
        })

        return response
    } catch (error) {
        throw new Error(error.message || "Erro de conexão com o servidor.");
    }
}

async function GetIncidents() {
    try {
        const response = await api("/api/v1/user_incidents", {
            method: "GET",
            credentials: 'include'
        })

        return response

    } catch (error) {
        throw new Error(error.message || "Erro de conexão com o servidor.");
    }
}






export { GetIncidents, CreateIncident };