import { createContext, useContext } from "react";
import UserStore from "./userStore";
import SubscriptionStore from "./subscriptionStore";


interface Store {
  userStore: UserStore;
    subscriptionStore: SubscriptionStore;
}

export const store: Store = {
  userStore: new UserStore(),
  subscriptionStore: new SubscriptionStore()
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
