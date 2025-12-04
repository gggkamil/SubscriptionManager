import { createContext, useContext } from "react";
import UserStore from "./userStore";
import SubscriptionStore from "./subscriptionStore";
import ProfileStore from "./profileStore";
import TransactionStore from "./transactionStore";


interface Store {
  userStore: UserStore;
  subscriptionStore: SubscriptionStore;
  profileStore: ProfileStore;
  transactionStore: TransactionStore;
}

export const store: Store = {
  userStore: new UserStore(),
  subscriptionStore: new SubscriptionStore(),
  profileStore: new ProfileStore(),
  transactionStore: new TransactionStore()
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
