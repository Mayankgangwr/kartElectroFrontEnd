// ProductDataProvider.ts
import axios, { AxiosRequestConfig } from 'axios';

const productApiClient = axios.create({
  baseURL: "https://fakestoreapi.com", // Assuming products have a different base URL
  // You can add other default configuration options here
});

let productDefaultPayload: any = {}; // Set your default payload here

export const setProductDefaultPayload = (payload: any) => {
  productDefaultPayload = payload;
};

export const fetchProductData = async (endpoint: string, authToken?: string, payload?: any) => {
  try {
    const config: AxiosRequestConfig = {
      headers: { ...getProductDefaultHeaders(authToken) },
      data: { ...productDefaultPayload, ...payload },
    };
    const response = await productApiClient.get(endpoint, config);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};
export const getSinglrProduct = async (endpoint: string, authToken?: string, payload?: any) => {
  try {
    const config: AxiosRequestConfig = {
      headers: { ...getProductDefaultHeaders(authToken) },
      data: { ...productDefaultPayload, ...payload },
    };
    const response = await productApiClient.get(endpoint, config);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};

export const postProductData = async (endpoint: string, data: any, authToken?: string, payload?: any) => {
  try {
    const config: AxiosRequestConfig = {
      headers: { ...getProductDefaultHeaders(authToken) },
      data: { ...productDefaultPayload, ...payload },
    };
    const response = await productApiClient.post(endpoint, data, config);
    return response.data;
  } catch (error) {
    console.error(`Error posting data to ${endpoint}:`, error);
    throw error;
  }
};

const getProductDefaultHeaders = (authToken?: string) => {
  const headers: Record<string, string> = {};
  const tokenToUse = authToken || undefined;

  if (tokenToUse) {
    headers['Authorization'] = `Bearer ${tokenToUse}`;
  }
  return headers;
};
