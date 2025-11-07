import { createContext, useContext } from "react";
import UserStore from "./userStore";
import SubscriptionStore from "./subscriptionStore";
import ProfileStore from "./profileStore";


interface Store {
  userStore: UserStore;
  subscriptionStore: SubscriptionStore;
  profileStore: ProfileStore;
}

export const store: Store = {
  userStore: new UserStore(),
  subscriptionStore: new SubscriptionStore(),
  profileStore: new ProfileStore()
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
