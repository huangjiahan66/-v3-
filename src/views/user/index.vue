<template>
  <div>
    用户管理
    <t-card>
      <div class="action-area">
        <t-button v-permission="PermissionEnum.USER_LIST_CREATE"
          >创建用户</t-button
        >
      </div>
      <div class="search-area">
        <t-input
          class="search-input"
          placeholder="请输入用户名"
          v-model="searchKey.name"
        ></t-input>
        <t-button @click="fetchData">
          <template #icon>
            <icon name="search"> </icon>
          </template>
        </t-button>
      </div>

      <t-table
        :columns="columns"
        :loading="loading"
        row-key="index"
        :data="data"
        :pagination="pagination"
        @page-change="onPageChange"
      ></t-table>
    </t-card>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "tdesign-vue-next";
import { onMounted, reactive, ref } from "vue";
import type { PaginationProps, PageInfo } from "tdesign-vue-next";
import { PermissionEnum } from "@/config/permission.config";
import type { UserType } from "@/api/types";
import userApi from "@/api/user";

const columns = [
  { colKey: "id", title: "ID" },
  { colKey: "username", title: "用户名" },
  { colKey: "nickname", title: "昵称" },
  { colKey: "roles", title: "角色" },
  { colKey: "operation", title: "操作" },
];
const data = ref<Array<UserType>>([]); //表单数据
const pagination = reactive<PaginationProps>({
  current: 1,
  total: 0,
  pageSize: 10,
});

const loading = ref(false);

const fetchData = () => {
  loading.value = true;
  userApi
    .list({
      name: searchKey.name,
      page: pagination.current,
      size: pagination.pageSize,
    })
    .then((res) => {
      data.value = res.data;
      pagination.current = res.paging.page;
      pagination.total = res.paging.total;
      pagination.pageSize = res.paging.size;
      loading.value = false;
    });
};
onMounted(() => {
  fetchData();
});
const searchKey = reactive({
  name: "",
});

const onPageChange = (pageInfo: PageInfo) => {
  pagination.current = pageInfo.current;
  pagination.pageSize = pageInfo.pageSize;
  fetchData();
};
</script>

<style lang="less" scoped>
.search-area {
  display: flex;
  margin-top: 20px;
  .search-input {
    width: 200px;
    margin-right: 20px;
  }
}
</style>
