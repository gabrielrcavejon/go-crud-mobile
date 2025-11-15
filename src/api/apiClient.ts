import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TOKEN_JWT = "TokenJWT";

const api = axios.create({
  baseURL: "http://192.168.0.37:3000/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// adiciona token automaticamente
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem(TOKEN_JWT);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
