import axios from "axios";

axios.defaults.baseURL = "https://localhost:5234/api";

axios.interceptors.request.use(config => {
  const token = window.localStorage.getItem("jwt");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const requests = {
  get: (url: string) => axios.get(url).then(r => r.data),
  post: (url: string, body: {}) => axios.post(url, body).then(r => r.data),
};

const Account = {
  login: (credentials: { email: string; password: string }) =>
    requests.post("/account/login", credentials),
  register: (values: { displayName: string; username: string; email: string; password: string }) =>
    requests.post("/account/register", values),
  current: () => requests.get("/account"),
};

const agent = { Account };
export default agent;
