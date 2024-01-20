import apiClient from ".";

export async function userLogin (form) {
    try {
        const resp = await apiClient.post("/auth/login", form);
    
        console.log({ resp });
    
        return resp.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
}