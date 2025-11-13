import type { Profile } from "./profile";

export interface Subscription {
  id: string;
  appUserId?: string;
  name: string;
  amount: number;
  maxContributors: number;
  nextPaymentDate: string; 
  appUser?: Profile;
  contributors: Profile[]; 
}
