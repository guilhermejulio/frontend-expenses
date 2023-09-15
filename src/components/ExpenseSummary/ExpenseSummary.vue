<template>
  <SummaryContainer>
    <div class="summary-card highlight-background">
      <header>
        <p>Despesas cadastradas</p>
        <q-icon name="check_circle" size="1.5em" />
      </header>
      <strong>{{ expensesCount }}</strong>
    </div>

    <div class="summary-card total-expenses">
      <header>
        <p>Valor total de despesas</p>
        <q-icon name="arrow_upward" size="1.5em" />
      </header>
      <strong>R${{ total }}</strong>
    </div>
  </SummaryContainer>
</template>

<script>
import { ref, onMounted } from "vue";
import { defineComponent } from "vue";
import SummaryContainer from "./SummaryContainer.vue";
import useApi from "src/composables/UseApi";

export default defineComponent({
  name: "ExpenseSummary",
  components: {
    SummaryContainer,
  },
  setup() {
    const total = ref(0);
    const expensesCount = ref(0);
    const { get } = useApi();

    const handleGetStatistics = async () => {
      try {
        const { statistics } = await get("/expenses/stats");
        total.value = statistics?.total;
        expensesCount.value = statistics?.expensesCount;
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
      handleGetStatistics();
    });

    return {
      total,
      expensesCount,
      handleGetStatistics,
    };
  },
});
</script>

<style scoped lang="scss">
.summary-card {
  padding: 1rem 2rem;
  border-radius: 0.25rem;
  color: var(--q-color-dark);
}

.summary-card > header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.highlight-background {
  background: #046f3d;
  color: #fff;
}
.total-expenses {
  background: #b92e34;
  color: #fff;
}
strong {
  display: block;
  margin-top: 1rem;
  font-size: 2rem;
  font-weight: 600;
  line-height: 3rem;
}
</style>
