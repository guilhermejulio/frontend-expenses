<template>
  <SummaryContainer>
    <div class="summary-card highlight-background">
      <header>
        <p>Despesas cadastradas</p>
        <q-icon name="check_circle" size="1.5em" />
      </header>
      <strong>{{ acceptedLeads }}</strong>
    </div>

    <div class="summary-card total-expenses">
      <header>
        <p>Valor total de despesas</p>
        <q-icon name="arrow_upward" size="1.5em" />
      </header>
      <strong>R${{ inviteLeads }}</strong>
    </div>
  </SummaryContainer>
</template>

<script>
import { ref } from "vue";
import { defineComponent } from "vue";
import SummaryContainer from "./SummaryContainer.vue";

export default defineComponent({
  name: "ExpenseSummary",
  components: {
    SummaryContainer,
  },
  setup() {
    const inviteLeads = 10;
    const rejectLeads = 5;
    const acceptedLeads = 15;

    return {
      inviteLeads,
      rejectLeads,
      acceptedLeads,
    };
  },
});
</script>

<style scoped lang="scss">
.summary-card {
  background: var(--q-color-primary);
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
