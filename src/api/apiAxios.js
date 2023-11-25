import httpClient from './client.http';

export default {
  get: (path, params) => {
    return httpClient.get(path, params);
  },
  post: (path, body) => {
    return httpClient.post(path, body);
  },
  put: (path, body, config) => {
    return httpClient.put(path, body, config);
  },
  delete: (path, params) => {
    return httpClient.delete(path, params);
  }
}