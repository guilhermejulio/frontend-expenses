<template>
  <div class="summary-container">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SummaryContainer",
  setup(props) {
    const highlight = ref(props.highlight || false);

    return {
      highlight,
    };
  },
});
</script>

<style scoped>
.summary-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}
</style>
