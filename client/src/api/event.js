import apiClient from ".";

export async function getEventsApi() {
  try {
    const resp = await apiClient.get("/events");
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getEventByIdApi(id) {
  try {
    const resp = await apiClient.get(`/events/${id}`);
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function createEventApi(data) {

  try {
    const resp = await apiClient.post("/events/create-event", data);
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function editEventApi({ id, data }) {
  try {
    const resp = await apiClient.put(`/events/${id}`, data);
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteEventApi(id) {
  try {
    const resp = await apiClient.delete(`/events/${id}`);
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
