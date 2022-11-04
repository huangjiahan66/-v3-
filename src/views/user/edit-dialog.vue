<template>
  <t-dialog :visible="visible" @close="$emit('close')"></t-dialog>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },

  data: {
    type: Object,
    value: null,
  },
});

const visible = computed(() => props.show);

defineEmits(["close"]);
</script>

<style scoped></style>
