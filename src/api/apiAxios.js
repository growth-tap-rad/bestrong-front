import httpClient from './client.http';

export default {
  get: (path, params) => {
    return httpClient.get(path, params);
  },
  post: (path, body) => {
    return httpClient.post(path, body);
  },
  put: (path, body) => {
    return httpClient.put(path, body);
  },
  delete: (path, body) => {
    return httpClient.delete(path, body);
  }
}