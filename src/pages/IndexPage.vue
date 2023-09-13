<template>
  <q-page padding>
    <ExpenseDashboard />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import ExpenseDashboard from "src/components/Dashboard/ExpenseDashboard.vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    ExpenseDashboard,
  },
});
</script>
