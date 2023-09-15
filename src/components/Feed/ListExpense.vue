<template>
  <q-page padding>
    <div class="row">
      <q-table
        title="Despesas"
        :rows="expensesList"
        :columns="columns"
        row-key="id"
        class="col-12"
        :loading="loading"
      >
        <template v-slot:top>
          <span class="text-h6">Suas despesas</span>
          <q-space />
          <q-btn
            color="primary"
            label="Nova Despesa"
            icon="add"
            :to="{ name: 'form-expense' }"
          />
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn
              color="primary"
              flat
              dense
              round
              icon="edit"
              @click="handleEdit(props.row)"
            >
              <q-tooltip> Editar </q-tooltip>
            </q-btn>
            <q-btn
              color="negative"
              flat
              dense
              round
              icon="delete"
              @click="handleRemoveExpense(props.row)"
            >
              <q-tooltip> Deletar </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
const columns = [
  {
    name: "description",
    label: "Descrição",
    align: "left",
    field: "description",
  },
  {
    name: "date",
    label: "Data",
    align: "left",
    field: "date",
  },
  {
    name: "amount",
    label: "Valor (R$)",
    align: "left",
    field: "amount",
    sortable: true,
  },
  {
    name: "created_at",
    label: "Criado em",
    align: "left",
    field: "created_at",
    sortable: true,
  },
  {
    name: "actions",
    label: "",
    align: "right",
    field: "actions",
  },
];

import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "ListExpense",

  setup(props, context) {
    const router = useRouter();
    const expensesList = ref([]);
    const loading = ref(true);
    const { list, remove } = useApi();
    const { notifyError, notifySuccess } = useNotify();
    const $q = useQuasar();

    const handleListExpenses = async () => {
      try {
        loading.value = true;
        const { expenses } = await list("/expenses");
        expensesList.value = expenses?.data;
        loading.value = false;
      } catch (error) {
        notifyError(error?.response?.data?.message);
        loading.value = false;
      }
    };

    const handleEdit = (expense) => {
      router.push({ name: "form-expense", params: { id: expense.id } });
    };

    const self = this;

    const handleRemoveExpense = async (expense) => {
      try {
        $q.dialog({
          title: "Deletar",
          message: `Deseja realmente deletar a despesa "${expense.description}"?`,
          cancel: true,
          persistent: true,
          ok: "Deletar",
          cancel: "Cancelar",
        }).onOk(async () => {
          await remove("/expenses", expense.id);
          context.emit("summary-update");
          notifySuccess("Despesa deletada com sucesso!");
          handleListExpenses();
        });
      } catch (error) {
        notifyError(error?.response?.data?.message);
      }
    };

    onMounted(() => {
      handleListExpenses();
    });

    return {
      columns,
      expensesList,
      loading,
      handleEdit,
      handleRemoveExpense,
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
