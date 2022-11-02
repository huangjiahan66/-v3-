import type { UserType } from "@/api/types";
import userApi from "@/api/user";

import { defineStore } from "pinia";

import { usePermissionStore } from "./permission";
type UserState = {
  currentUser: UserType | null;
};
export const useUserStore = defineStore("user", {
  state: (): UserState => {
    return {
      currentUser: null, //用户信息
    };
  },
  persist: true,
  actions: {
    async fetchCurrentUser() {
      this.currentUser = await userApi.me();
      usePermissionStore().generateRoutes(this.currentUser.permissions);
    },
  },
});
