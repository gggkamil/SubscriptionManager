import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import type { Subscription } from "../models/subscription";

export default class SubscriptionStore {
  subscriptions: Subscription[] = [];
  selectedSubscription: Subscription | undefined = undefined;
  loading = false;
  submitting = false;
  loadingInitial = false; // 👈 add this

  constructor() {
    makeAutoObservable(this);
  }

  loadSubscriptions = async () => {
    this.loadingInitial = true; // 👈 set this
    try {
      const result = await agent.Subscriptions.list();
      runInAction(() => {
        this.subscriptions = result;
      });
    } catch (error) {
      console.error("Failed to load subscriptions:", error);
    } finally {
      runInAction(() => {
        this.loadingInitial = false; // 👈 unset it
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
    } catch (error) {
      console.error("Failed to create subscription:", error);
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
