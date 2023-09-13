<template>
  <DashboardContainerVue>
    <ExpenseSummary />
    <ListExpense />
  </DashboardContainerVue>
</template>

<script>
import { defineComponent } from "vue";
import ExpenseSummary from "../ExpenseSummary/ExpenseSummary.vue";
import DashboardContainerVue from "./DashboardContainer.vue";
import ListExpense from "../Feed/ListExpense.vue";

export default defineComponent({
  name: "ExpenseDashboard",
  components: {
    ExpenseSummary,
    DashboardContainerVue,
    ListExpense,
  },
});
</script>
