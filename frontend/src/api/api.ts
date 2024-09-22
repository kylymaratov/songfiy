import axios from 'axios';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

const api = axios.create({ baseURL: '/api/v1' });

api.interceptors.request.use(
  (request) => {
    request.headers.set('Content-Type', 'application/json');

    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

type ApiRequestBody = Record<string, any> | null;
type ApiResponse<T = any> = Promise<T>;

export const apiRequest = async <T>(
  url: string,
  method: RequestMethod = 'GET',
  body: ApiRequestBody = null,
  headers: Record<string, string> = {},
): ApiResponse<T> => {
  const response = await api({
    url,
    method,
    data: JSON.stringify(body),
    headers,
  });

  return response.data as T;
};
