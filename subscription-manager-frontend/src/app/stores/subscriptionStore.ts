import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import type { Subscription } from "../models/subscription";
import { toast } from "react-toastify";

export default class SubscriptionStore {
  subscriptions: Subscription[] = [];
  selectedSubscription: Subscription | undefined = undefined;
  loading = false;
  submitting = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }
getSubscription = (id: string) => {
  return this.subscriptions.find(s => s.id === id);
};
  loadSubscriptions = async () => {
    this.loadingInitial = true;
    try {
      const result = await agent.Subscriptions.list();
      runInAction(() => {
        this.subscriptions = result;
      });
    } catch (error) {
      console.error("Failed to load subscriptions:", error);
    } finally {
      runInAction(() => {
        this.loadingInitial = false; 
      });
    }
  };

createSubscription = async (subscription: Subscription) => {
  this.submitting = true;
  try {
    await agent.Subscriptions.create(subscription);
    runInAction(() => {
      this.subscriptions.push(subscription);
    });
    toast.success("Subscription created successfully!");
  } catch (error) {
    toast.error("Failed to create subscription");
    console.error(error);
  } finally {
    runInAction(() => (this.submitting = false));
  }
};

  updateSubscription = async (subscription: Subscription) => {
    this.submitting = true;
    try {
      await agent.Subscriptions.update(subscription);
      runInAction(() => {
        const idx = this.subscriptions.findIndex(x => x.id === subscription.id);
        if (idx !== -1) this.subscriptions[idx] = subscription;
      });
    } catch (error) {
      console.error("Failed to update subscription:", error);
    } finally {
      runInAction(() => (this.submitting = false));
    }
  };

  deleteSubscription = async (id: string) => {
    this.submitting = true;
    try {
      await agent.Subscriptions.delete(id);
      runInAction(() => {
        this.subscriptions = this.subscriptions.filter(x => x.id !== id);
      });
    } catch (error) {
      console.error("Failed to delete subscription:", error);
    } finally {
      runInAction(() => (this.submitting = false));
    }
  };
}
