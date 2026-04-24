import { api } from "./api";


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






export { GetIncidents };