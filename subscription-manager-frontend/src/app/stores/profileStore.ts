import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import type { Profile } from "../models/profile";

export default class ProfileStore {
  profile: Profile | null = null;
  loadingProfile = false;
  updatingProfile = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadProfile = async (id: string) => {
    this.loadingProfile = true;
    try {
      const profile = await agent.Profiles.get(id);
      runInAction(() => {
        this.profile = profile;
      });
    } catch (error) {
      console.error("Error loading profile", error);
    } finally {
      runInAction(() => (this.loadingProfile = false));
    }
  };

  updateProfile = async (id: string, updated: Profile) => {
    this.updatingProfile = true;
    try {
      await agent.Profiles.update(id, updated);
      runInAction(() => {
        if (this.profile) this.profile = { ...this.profile, ...updated };
      });
    } catch (error) {
      console.error("Error updating profile", error);
    } finally {
      runInAction(() => (this.updatingProfile = false));
    }
  };
}
