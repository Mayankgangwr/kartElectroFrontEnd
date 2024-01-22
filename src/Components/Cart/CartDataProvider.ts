// CartDataProvider.ts
import axios, { AxiosRequestConfig } from 'axios';

const cartApiClient = axios.create({
    baseURL: "https://fakestoreapi.com", // Assuming a different base URL for the cart operations
    // You can add other default configuration options here
});

let cartDefaultPayload: any = {}; // Set your default payload here

export const setCartDefaultPayload = (payload: any) => {
    cartDefaultPayload = payload;
};

export const getCartItems = async (endpoint: string, authToken?: string, payload?: any) => {
    try {
        const config: AxiosRequestConfig = {
            headers: { ...getCartDefaultHeaders(authToken) },
            data: { ...cartDefaultPayload, ...payload },
        };
        const response = await cartApiClient.get(endpoint, config);
        return response.data;
    } catch (error) {
        console.error(`Error fetching cart items:`, error);
        throw error;
    }
};

export const addToCart = async (endpoint: string, productId: number, quantity: number, authToken?: string, payload?: any) => {
    try {
        const config: AxiosRequestConfig = {
            headers: { ...getCartDefaultHeaders(authToken) },
            data: { productId, quantity, ...cartDefaultPayload, ...payload },
        };
        const response = await cartApiClient.post(endpoint, {}, config);
        return response.data;
    } catch (error) {
        console.error(`Error adding to cart:`, error);
        throw error;
    }
};

export const removeFromCart = async (endpoint: string, productId: number, authToken?: string, payload?: any) => {
    try {
        const config: AxiosRequestConfig = {
            headers: { ...getCartDefaultHeaders(authToken) },
            data: { productId, ...cartDefaultPayload, ...payload },
        };
        const response = await cartApiClient.post(endpoint, {}, config);
        return response.data;
    } catch (error) {
        console.error(`Error removing from cart:`, error);
        throw error;
    }
};

export const clearCart = async (endpoint: string, authToken?: string, payload?: any) => {
    try {
        const config: AxiosRequestConfig = {
            headers: { ...getCartDefaultHeaders(authToken) },
            data: { ...cartDefaultPayload, ...payload },
        };
        const response = await cartApiClient.post(endpoint, {}, config);
        return response.data;
    } catch (error) {
        console.error(`Error clearing cart:`, error);
        throw error;
    }
};

const getCartDefaultHeaders = (authToken?: string) => {
    const headers: Record<string, string> = {};
    const tokenToUse = authToken || undefined;

    if (tokenToUse) {
        headers['Authorization'] = `Bearer ${tokenToUse}`;
    }
    return headers;
};
