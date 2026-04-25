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


async function DeleteIncident(id_incident) {
    try {
        const response = await api(`api/v1/incidents/${id_incident}`, {
            method: "DELETE",
            credentials: 'include'
        })
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

async function QueryIncidents(offset, limit, status, priority, create_at, creator) {
    const params = new URLSearchParams();

    if (filtros.offset != null) params.append("offset", filtros.offset);
    if (filtros.limit != null) params.append("limit", filtros.limit);
    if (filtros.status != null) params.append("status", filtros.status);
    if (filtros.priority != null) params.append("priority", filtros.priority);
    if (filtros.created_at != null) params.append("created_at", filtros.created_at);
    if (filtros.creator != null) params.append("creator", filtros.creator);

    const response = await api(`/api/v1/incidents?${params.toString()}`, {
        method: "GET",
        credentials: 'include'
    })

    return response
}




export { GetIncidents, CreateIncident };