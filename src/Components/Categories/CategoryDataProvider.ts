// CategoryDataProvider.ts
import axios, { AxiosRequestConfig } from 'axios';

const categoryApiClient = axios.create({
  baseURL: "https://fakestoreapi.com", // Assuming categories have a different base URL
  // You can add other default configuration options here
});

let defaultPayload: any = {}; // Set your default payload here

export const setCategoryDefaultPayload = (payload: any) => {
  defaultPayload = payload;
};

export const fetchCategoryData = async (endpoint: string, authToken?: string, payload?: any) => {
  try {
    const config: AxiosRequestConfig = {
      headers: { ...getCategoryDefaultHeaders(authToken) },
      data: { ...defaultPayload, ...payload },
    };
    const response = await categoryApiClient.get(endpoint, config);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};

export const postCategoryData = async (endpoint: string, data: any, authToken?: string, payload?: any) => {
  try {
    const config: AxiosRequestConfig = {
      headers: { ...getCategoryDefaultHeaders(authToken) },
      data: { ...categoryDefaultPayload, ...payload },
    };
    const response = await categoryApiClient.post(endpoint, data, config);
    return response.data;
  } catch (error) {
    console.error(`Error posting data to ${endpoint}:`, error);
    throw error;
  }
};

const getCategoryDefaultHeaders = (authToken?: string) => {
  const headers: Record<string, string> = {};
  const tokenToUse = authToken || undefined;

  if (tokenToUse) {
    headers['Authorization'] = `Bearer ${tokenToUse}`;
  }
  return headers;
};
