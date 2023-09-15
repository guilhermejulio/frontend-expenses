<template>
  <DashboardContainerVue>
    <ExpenseSummary ref="expenseSummaryRef" />
    <ListExpense @summary-update="handleUpdateSummary" />
  </DashboardContainerVue>
</template>

<script>
import { defineComponent, ref } from "vue";
import ExpenseSummary from "../ExpenseSummary/ExpenseSummary.vue";
import DashboardContainerVue from "./DashboardContainer.vue";
import ListExpense from "../Feed/ListExpense.vue";

export default defineComponent({
  name: "ExpenseDashboard",

  setup() {
    const expenseSummaryRef = ref(null);

    const handleUpdateSummary = () => {
      expenseSummaryRef.value.handleGetStatistics();
    };

    return {
      handleUpdateSummary,
      expenseSummaryRef,
    };
  },

  components: {
    ExpenseSummary,
    DashboardContainerVue,
    ListExpense,
  },
});
</script>
