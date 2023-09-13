<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "DashboardContainer",
});
</script>

  <style scoped>
.container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 2.5rem 1rem;
}
</style>
