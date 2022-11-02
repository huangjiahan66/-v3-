<template>
  <t-header class="header">
    <collapse-button v-model:collapse="appStore.menuCollapse"></collapse-button>
    <div class="operation-area">
      <t-dropdown
        :options="[{ content: '退出登录', value: 'logout' }]"
        @click="clickHandler"
      >
        <t-button variant="text">
          <template #icon>
            <icon name="user"></icon>
          </template>
          {{ userStore.currentUser && userStore.currentUser.nickname }}
        </t-button>
      </t-dropdown>
    </div>
  </t-header>
</template>

<script setup lang="ts">
import { useUserStore, useAppStore } from "@/store";
import { Icon, type DropdownOption } from "tdesign-vue-next";
import { useRoute, useRouter } from "vue-router";
import CollapseButton from "@/components/CollapseButton.vue";
const userStore = useUserStore();
const appStore = useAppStore();
const router = useRouter();
const route = useRoute();
const clickHandler = async ({ value }: DropdownOption) => {
  switch (value) {
    case "logout":
      await appStore.logout();
      await router.push(`login?redirect=${route.fullPath}`);
      break;
    default:
      throw new Error("该指令无设置任何操作");
  }
};
</script>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
}
</style>
