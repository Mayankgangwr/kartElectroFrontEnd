// AuthDataProvider.ts
import axios, { AxiosRequestConfig } from 'axios';

const authApiClient = axios.create({
    baseURL: "https://fakeauthapi.com", // Replace with your authentication API base URL
    // You can add other default configuration options here
});

let authDefaultPayload: any = {}; // Set your default payload here

export const setAuthDefaultPayload = (payload: any) => {
    authDefaultPayload = payload;
};

export const register = async (endpoint: string, credentials: any) => {
    try {
        const response = await fetch(`https://fakestoreapi.com${endpoint}`, {
            method: "POST",
            body: JSON.stringify(
                {
                    email: 'John@gmail.com',
                    username: 'johnd',
                    password: 'm38rmF$',
                    name: {
                        firstname: 'John',
                        lastname: 'Doe'
                    },
                    address: {
                        city: 'kilcoole',
                        street: '7835 new road',
                        number: 3,
                        zipcode: '12926-3874',
                        geolocation: {
                            lat: '-37.3159',
                            long: '81.1496'
                        }
                    },
                    phone: '1-570-236-7033'
                }
            )
        });
        return await response.json();
    } catch (error) {
        console.error(`Error logging in:`, error);
        throw error;
    }
};

export const login = async (endpoint: string, credentials: any) => {
    try {
        const response = await fetch(`https://fakestoreapi.com${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: "mor_2314",
                password: "83r5^_"
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error logging in:`, error);
        throw error;
    }
};

export const fetchProfileData = async (endpoint: string, authToken?: string, payload?: any) => {
    try {
        const response = await fetch(`https://fakestoreapi.com${endpoint}`);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        throw error;
    }
};


const getAuthDefaultHeaders = (authToken?: string) => {
    const headers: Record<string, string> = {};
    const tokenToUse = authToken || undefined;

    if (tokenToUse) {
        headers['Authorization'] = `Bearer ${tokenToUse}`;
    }
    return headers;
};
