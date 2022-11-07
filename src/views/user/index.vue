<template>
  <t-card>
    <div class="action-area">
      <t-button
        v-permission="PermissionEnum.USER_LIST_CREATE"
        @click="handleCreate"
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
    >
      <template #operation="slotProps">
        <t-button @click="handleEdit(slotProps)">
          <icon name="edit"></icon>编辑
        </t-button>
      </template>
    </t-table>
  </t-card>

  <edit-dialog
    :show="showDialog"
    :data="data"
    @close="onDialogClose"
  ></edit-dialog>
</template>

<script setup lang="ts">
import { Icon } from "tdesign-vue-next";

import { reactive } from "vue";
import { PermissionEnum } from "@/config/permission.config";
import type { UserType } from "@/api/types";
import userApi from "@/api/user";
import EditDialog from "./edit-dialog.vue";
import { useEditDialog } from "@/composables/useEditDialog";
import { useSearch } from "@/composables/useSearch";
const searchKey = reactive({
  name: "",
});
const columns = [
  { colKey: "id", title: "ID" },
  { colKey: "username", title: "用户名" },
  { colKey: "nickname", title: "昵称" },
  { colKey: "roles", title: "角色" },
  { colKey: "operation", title: "操作" },
];

const { data, pagination, loading, fetchData, onPageChange } = useSearch<
  UserType,
  { name: string }
>(userApi, searchKey);

// 默认值
const defaultData: UserType = {
  id: "",
  username: "",
  nickname: "",
  roles: [],
  permissions: [],
};
const { showDialog, editData, handleCreate, handleEdit, onDialogClose } =
  useEditDialog(defaultData);
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
