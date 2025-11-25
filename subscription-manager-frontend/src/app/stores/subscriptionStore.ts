import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import type { Subscription } from "../models/subscription";
import { toast } from "react-toastify";

export default class SubscriptionStore {
  subscriptions: Subscription[] = [];
  filteredSubscriptions: Subscription[] = [];
  selectedSubscription: Subscription | undefined = undefined;
  loading = false;
  submitting = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

 
  getSubscription = (id: string) => {
    return this.subscriptions.find((s) => s.id === id);
  };

  loadSubscriptions = async () => {
    this.loadingInitial = true;
    try {
      const result = await agent.Subscriptions.list();
      runInAction(() => {
        this.subscriptions = result;
        this.filteredSubscriptions = result; 
      });
    } catch (error) {
      console.error("Failed to load subscriptions:", error);
    } finally {
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };


  filterAll = () => {
    this.filteredSubscriptions = this.subscriptions;
  };

  filterActive = () => {
    const now = new Date();
    this.filteredSubscriptions = this.subscriptions.filter(
      (s) => new Date(s.nextPaymentDate) > now
    );
  };

  filterExpired = () => {
    const now = new Date();
    this.filteredSubscriptions = this.subscriptions.filter(
      (s) => new Date(s.nextPaymentDate) <= now
    );
  };

  createSubscription = async (subscription: Subscription) => {
    this.submitting = true;
    try {
      await agent.Subscriptions.create(subscription);
      runInAction(() => {
        this.subscriptions.push(subscription);
        this.filterAll(); 
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
        const idx = this.subscriptions.findIndex((x) => x.id === subscription.id);
        if (idx !== -1) this.subscriptions[idx] = subscription;
        this.filterAll(); 
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
        this.subscriptions = this.subscriptions.filter((x) => x.id !== id);
        this.filterAll(); 
      });
    } catch (error) {
      console.error("Failed to delete subscription:", error);
    } finally {
      runInAction(() => (this.submitting = false));
    }
  };
  joinSubscription = async (subscriptionId: string) => {
  try {
    await agent.Subscriptions.join(subscriptionId);
    await this.loadSubscriptions();   
  } catch (error) {
    console.error("Join failed", error);
  }
}

leaveSubscription = async (subscriptionId: string) => {
  try {
    await agent.Subscriptions.leave(subscriptionId);
    await this.loadSubscriptions();
  } catch (error) {
    console.error("Leave failed", error);
  }
}
pay = async (subscriptionId: string) => {
    await agent.Subscriptions.pay(subscriptionId);
    toast.success("Payment added!");

    await this.loadSubscriptions(); 
};


}
