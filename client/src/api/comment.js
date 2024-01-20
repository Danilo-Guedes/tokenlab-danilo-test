import apiClient from ".";


export async function createComment(data) {
    console.log("data na api", data);
  try {
    const resp = await apiClient.post(`/posts/${data.postId}/comment/create`, data);

    console.log({ resp });

    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
