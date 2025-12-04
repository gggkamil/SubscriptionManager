import axios from "axios";
import type { Subscription } from "../models/subscription";
import type { Profile } from "../models/profile";
import type { Transaction } from "../models/transaction";

axios.defaults.baseURL = "https://localhost:7206/api";


axios.interceptors.request.use(config => {
  const token = window.localStorage.getItem("jwt");
  if (token && config.headers)
    config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const responseBody = (response: any) => response.data;

const requests = {
 get: <T>(url: string) => axios.get<T>(url).then(responseBody),

  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};


const Subscriptions = {
  list: (): Promise<Subscription[]> => requests.get("/subscriptions"),
  details: (id: string): Promise<Subscription> => requests.get(`/subscriptions/${id}`),
  create: (subscription: Subscription) => requests.post("/subscriptions", subscription),
  update: (subscription: Subscription) =>
    requests.put(`/subscriptions/${subscription.id}`, subscription),
  delete: (id: string) => requests.del(`/subscriptions/${id}`),
  join: (id: string) => requests.post(`/subscriptions/${id}/join`, {}),
  leave: (id: string) => requests.post(`/subscriptions/${id}/leave`, {}),
  pay: (id: string) => requests.post(`/subscriptions/${id}/pay`, {})

};

const Transactions = {
    listMine: () => requests.get<Transaction[]>('/transactions/mine')
};

const Account = {
  login: (credentials: { email: string; password: string }) =>
    requests.post("/account/login", credentials),
  register: (values: { fullName: string; email: string; password: string }) =>
    requests.post("/account/register", values),
  current: () => requests.get("/account/me"),
};

const Profiles = {
  get: (id: string): Promise<Profile> =>
    requests.get(`/profiles/${id}`),
  update: (id: string, profile: Profile) =>
    requests.put(`/profiles/${id}`, profile),
};

const agent = {
  Account,
  Subscriptions,
  Profiles,
  Transactions
};

export default agent;
