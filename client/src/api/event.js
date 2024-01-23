import apiClient from ".";

export async function getEventsApi() {
  try {
    const resp = await apiClient.get("/events");

    console.log({ resp });

    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function createEventApi(data) {
    console.log("data na api", data);

    console.log("typeof startDate", typeof data.startDateAndHour);
  try {
    const resp = await apiClient.post("/events/create-event", data);

    console.log({ resp });

    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
