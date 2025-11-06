import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { router } from "../routes/routes";

export default class UserStore {
  user: any = null;
  token: string | null = window.localStorage.getItem("jwt");

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (credentials: { email: string; password: string }) => {
    const user = await agent.Account.login(credentials);
    runInAction(() => {
      this.user = user;
      this.token = user.token;
      window.localStorage.setItem("jwt", user.token);
    });
    router.navigate("/subscriptions");
  };

  register = async (values: { displayName: string; username: string; email: string; password: string }) => {
    const user = await agent.Account.register(values);
    runInAction(() => {
      this.user = user;
      this.token = user.token;
      window.localStorage.setItem("jwt", user.token);
    });
    router.navigate("/subscriptions"); 
  };

  logout = () => {
    this.user = null;
    this.token = null;
    window.localStorage.removeItem("jwt");
    router.navigate("/"); 
  };

  getCurrentUser = async () => {
    try {
      const user = await agent.Account.current();
      runInAction(() => (this.user = user));
    } catch (error) {
      console.error(error);
      this.logout(); 
    }
  };
}
