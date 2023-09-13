<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">{{ description }}</div>
      <div class="q-ml-md">{{ date }}</div>
    </q-card-section>

    <q-card-section>
      <div class="text-h6">Valor: {{ value }}</div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ExpenseCard",

  props: {
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
});
</script>

<style scoped>
/* Estilos personalizados do seu card aqui, se necessário */
</style>
