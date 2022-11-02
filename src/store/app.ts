import tokenApi from "@/api/token";
import type { TokenRequest } from "@/api/types";
import { type StoreDefinition, defineStore } from "pinia";
import { useUserStore } from "./user";

type AppState = {
  token: string;
  menuCollapse: boolean;
};
export const useAppStore = defineStore("app", {
  state: (): AppState => {
    return {
      token: "",
      menuCollapse: false,
    };
  },
  persist: true,
  actions: {
    async login(loginForm: TokenRequest): Promise<void> {
      this.token = await tokenApi.createToken(loginForm);
    },

    async logout(): Promise<void> {
      const userStore = useUserStore();
      this.token = "";
      userStore.$reset();
    },
  },
});
