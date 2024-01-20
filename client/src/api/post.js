import apiClient from ".";

export async function fetchPosts() {
  try {
    const resp = await apiClient.get("/posts/list");

    console.log({ resp });

    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function createPost(data) {
    console.log("data na api", data);
  try {
    const resp = await apiClient.post("/posts/create", data);

    console.log({ resp });

    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
