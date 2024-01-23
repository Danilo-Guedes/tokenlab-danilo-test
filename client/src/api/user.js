import apiClient from ".";

export async function createUser(user) {
  try {
    const resp = await apiClient.post("/users/create", user);

    console.log({ resp });

    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function getUserById() {
  try {

    const resp = await apiClient.get("/users/me", );

    console.log({ resp });

    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
