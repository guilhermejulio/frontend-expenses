<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleRegister">
      <p class="col-12 text-h4 text-center">Register</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Nome"
          v-model="form.name"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Nome é obrigatório']"
          outlined
        />

        <q-input
          v-model="form.email"
          label="Email"
          type="email"
          outlined
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Email é obrigatório']"
        />
        <q-input
          v-model="form.password"
          label="Senha"
          type="password"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Senha é obrigatória']"
          outlined
        >
        </q-input>

        <div class="full-width q-pt-md">
          <q-btn
            class="full-width"
            color="primary"
            label="Registrar"
            type="submit"
          />

          <q-btn
            label="Voltar"
            color="dark"
            class="full-width"
            flat
            :to="{ name: 'login' }"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import { useRouter } from "vue-router";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "PageLogin",
  setup() {
    const router = useRouter();
    const { register, isLogged } = useAuthUser();
    const { notifyError, notifySuccess } = useNotify();
    const form = ref({
      name: "",
      email: "",
      password: "",
    });

    onMounted(() => {
      if (isLogged()) {
        router.push({ name: "home" });
      }
    });

    const handleRegister = async () => {
      try {
        await register(form.value);
        notifySuccess("Registrado com sucesso!");
        router.push({ name: "home" });
      } catch (error) {
        notifyError(error?.response?.data?.message);
      }
    };

    return {
      form,
      handleRegister,
    };
  },
});
</script>
