import type { Profile } from "./profile";

export interface Subscription {
  id: string;
  appUserId?: string;
  name: string;
  amount: number;
  frequency: string;
  nextPaymentDate: string; 
  appUser?: Profile;
}
