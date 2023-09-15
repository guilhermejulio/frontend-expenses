<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">
          {{ isUpdate ? "Atualizar" : "Cadastrar" }} despesa
        </p>
      </div>

      <q-form
        class="col-md-7 col-xs-12 col-sm-12 q-guttet-y-md"
        @submit.prevent="handleSave"
      >
        <q-input
          v-model="form.description"
          label="Descrição"
          outlined
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'A descrição é obrigatória',
            (val) =>
              (val && val.length <= 191) ||
              'A descrição deve ter no máximo 191 caracteres',
          ]"
        >
        </q-input>

        <q-input
          class="q-mt-md"
          label="Data"
          outlined
          v-model="form.date"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'A data é obrigatória',
            (val) => {
              if (val) {
                const currentDate = new Date();
                const [day, month, year] = val.split('/').map(Number);
                const inputDate = new Date(year, month - 1, day);
                return (
                  inputDate <= currentDate ||
                  'A data deve ser menor ou igual à data atual'
                );
              }
              return true;
            },
          ]"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="form.date"
                  :options="optionsDateFn"
                  :locale="myLocale"
                  mask="DD/MM/YYYY"
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <CurrencyInput
          class="q-mt-md"
          v-model="form.amount"
          :required="true"
          label="Valor da despesa"
          :modelValue="form.amount"
          :minValue="minVal"
        />

        <div class="full-width q-pt-md">
          <q-btn
            class="full-width"
            color="primary"
            :label="isUpdate ? 'Atualizar' : 'Cadastrar'"
            type="submit"
            :disable="!isFormValid"
          />
        </div>

        <div class="full-width q-gutter-y-md">
          <q-btn
            label="Voltar"
            color="primary"
            class="full-width"
            flat
            :to="{ name: 'home' }"
            size="md"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";
import CurrencyInput from "src/components/Currency/CurrencyInput.vue";

export default defineComponent({
  components: { CurrencyInput },
  name: "FormExpense",
  setup() {
    const form = ref({
      description: "",
      amount: 0,
      date: "",
    });
    const minVal = 0;

    const myLocale = {
      days: "Domingo_Segunda_Terça_Quarta_Quinta_Sexta_Sábado".split("_"),
      daysShort: "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),
      months:
        "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split(
          "_"
        ),
      monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
      firstDayOfWeek: 1,
      today: "Hoje",
      clear: "Limpar",
      format24h: true,
      pluralDay: "dias",
    };

    const optionsDateFn = (date) => {
      const currentDate = new Date();
      const [year, month, day] = date.split("/").map(Number);
      const inputDate = new Date(year, month - 1, day);
      return inputDate <= currentDate;
    };

    const router = useRouter();
    const route = useRoute();
    const { post, getById, update } = useApi();
    const { notifyError, notifySuccess } = useNotify();

    const isUpdate = computed(() => route.params.id);
    const isFormValid = computed(() => {
      return (
        form.value.description && form.value.amount > minVal && form.value.date
      );
    });

    const handleSave = async () => {
      try {
        if (isUpdate.value) {
          await update("expenses", isUpdate.value, {
            amount: parseFloat(form.value.amount).toFixed(2),
            date: form.value.date.split("/").reverse().join("-"),
            description: form.value.description,
          });
          notifySuccess("Despesa atualizada com sucesso!");
        } else {
          await post("/expenses", {
            amount: parseFloat(form.value.amount).toFixed(2),
            date: form.value.date.split("/").reverse().join("-"),
            description: form.value.description,
          });
          notifySuccess("Despesa cadastrada com sucesso!");
        }
        router.push({ name: "home" });
      } catch (error) {
        notifyError(error?.response?.data?.message);
      }
    };

    const handleGetExpense = async (id) => {
      try {
        const { expense } = await getById("/expenses", id);
        form.value = expense;
        form.value.amount = expense.amount;
        console.log(typeof expense.amount);
      } catch (error) {
        notifyError(error?.response?.data?.message);
      }
    };

    onMounted(() => {
      if (isUpdate.value) {
        handleGetExpense(isUpdate.value);
      }
    });

    return {
      form,
      isUpdate,
      handleSave,
      myLocale,
      optionsDateFn,
      minVal,
      isFormValid,
    };
  },
});
</script>
