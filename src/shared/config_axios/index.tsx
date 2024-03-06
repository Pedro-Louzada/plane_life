import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Crie uma instância do axios com a configuração desejada
const axiosInstance = axios.create({
  baseURL: 'https://plane-life-2-production-renansouzzzz.svc-us3.zcloud.ws',
  // Outras configurações opcionais, como headers, etc., podem ser definidas aqui
});

axiosInstance.interceptors.request.use(
  async config => {
    if (
      config.url?.includes('/users/create') ||
      config.url?.includes('/token')
    ) {
      return config;
    }
    const token = await AsyncStorage.getItem('@asyncStorage:token');

    config.headers.Authorization = `Bearer ${token}`;
    console.log(token);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
