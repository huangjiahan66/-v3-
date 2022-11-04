import type { Searchable } from "@/api/types";
import { onMounted, reactive, ref, type Ref } from "vue";
import type { PaginationProps, PageInfo } from "tdesign-vue-next";

export const useSearch = <T, K>(api: Searchable<T>, searchKey: K) => {
  const data = <Ref<Array<T>>>ref([]); //要渲染的表单数据
  // 分页模型
  const pagination = reactive<PaginationProps>({
    current: 1,
    total: 0,
    pageSize: 10,
  });

  const loading = ref(false);

  const fetchData = () => {
    loading.value = true;
    api
      .list({
        page: pagination.current,
        size: pagination.pageSize,
        ...searchKey,
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

  const onPageChange = (pageInfo: PageInfo) => {
    pagination.current = pageInfo.current;
    pagination.pageSize = pageInfo.pageSize;
    fetchData();
  };

  return { data, pagination, loading, fetchData, onPageChange };
};
