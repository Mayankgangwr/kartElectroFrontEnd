// api.ts
import axios from 'axios';

const API_BASE_URL = 'https://localhost:44385/api/UserAuth';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const DataProvider = {
  // Example for fetching data
  async fetchData(endpoint: string) {
    const response = await api.get(endpoint);
    return response.data;
  },

  // Example for posting data
  async postData(endpoint: string) {
    const response = await api.post("/registration");
    return response.data;
  },

  // Example for updating data
  async updateData(endpoint: string, data: any) {
    const response = await api.put(endpoint, data);
    return response.data;
  },

  // Example for deleting data
  async deleteData(endpoint: string) {
    const response = await api.delete(endpoint);
    return response.data;
  },
};
