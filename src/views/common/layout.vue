<template>
  <div>
    <t-layout class="main-layout">
      <sidebar></sidebar>
      <t-layout>
        <global-header></global-header>
        <t-content>
          <router-view></router-view>
        </t-content>
        <t-footer>底部</t-footer>
      </t-layout>
    </t-layout>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from "./header.vue";
import Sidebar from "@/views/common/sidebar.vue";
</script>

<style scoped lang="less">
.main-layout {
  height: 100vh;
}
</style>
