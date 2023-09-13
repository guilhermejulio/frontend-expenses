<template>
  <q-list class="expenses-list">
    <q-item v-for="(item, index) in cardItems" :key="index">
      <q-item-section>
        <card
          :description="item.description"
          :date="item.date"
          :value="item.value"
        ></card>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { defineComponent } from "vue";
import Card from "./ExpenseCard.vue";

const cardItems = [
  {
    description: "Descrição do Card 1",
    date: "12 de setembro, 2023",
    value: "R$ 100,00",
  },
  {
    description: "Descrição do Card 2",
    date: "13 de setembro, 2023",
    value: "R$ 150,00",
  },
];

export default defineComponent({
  name: "ListExpense",
  components: {
    Card,
  },
  setup() {
    return {
      cardItems,
    };
  },
});
</script>

<style scoped>
.expenses-list {
  margin-top: 2rem;
  gap: 1rem;
}
</style>
