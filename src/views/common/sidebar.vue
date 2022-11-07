<template>
  <t-aside :width="appStore.menuCollapse ? '64px' : '232px'">
    <t-menu :collapsed="appStore.menuCollapse" :defaultValue="$route.name">
      <sidebar-item
        v-for="item in permissionStore.menuRoutes"
        :key="item.name"
        :item="item"
      ></sidebar-item>
    </t-menu>
  </t-aside>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store";
import { usePermissionStore } from "@/store/permission";
import SidebarItem from "@/components/SidebarItem.vue";
const appStore = useAppStore();
const permissionStore = usePermissionStore();
console.log(permissionStore);
</script>

<style scoped></style>
