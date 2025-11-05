import axios from "axios";
import type { Subscription } from "../models/subscription";


axios.defaults.baseURL = "https://localhost:7206/api";

// Attach JWT token if present
axios.interceptors.request.use(config => {
  const token = window.localStorage.getItem("jwt");
  if (token && config.headers)
    config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const responseBody = (response: any) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

// ---- 👇 Add Subscriptions API integration ----
const Subscriptions = {
  list: (): Promise<Subscription[]> => requests.get("/subscriptions"),
  details: (id: string): Promise<Subscription> => requests.get(`/subscriptions/${id}`),
  create: (subscription: Subscription) => requests.post("/subscriptions", subscription),
  update: (subscription: Subscription) =>
    requests.put(`/subscriptions/${subscription.id}`, subscription),
  delete: (id: string) => requests.del(`/subscriptions/${id}`),
};

// ---- Existing Account endpoints ----
const Account = {
  login: (credentials: { email: string; password: string }) =>
    requests.post("/account/login", credentials),
  register: (values: {
    displayName: string;
    username: string;
    email: string;
    password: string;
  }) => requests.post("/account/register", values),
  current: () => requests.get("/account/me"),
};

// ---- Export unified API agent ----
const agent = {
  Account,
  Subscriptions,
};

export default agent;
