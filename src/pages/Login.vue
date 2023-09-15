<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <p class="col-12 text-h4 text-center">Login</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
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
          outlined
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Senha é obrigatória']"
        >
        </q-input>

        <div class="full-width q-pt-md">
          <q-btn
            class="full-width"
            color="primary"
            label="Login"
            type="submit"
          />
        </div>

        <div class="full-width q-gutter-y-md">
          <q-btn
            label="cadastre-se"
            color="primary"
            class="full-width"
            flat
            to="/register"
            size="md"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import useNotify from "src/composables/UseNotify";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "PageLogin",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { login, isLogged } = useAuthUser();
    const { notifyError, notifySuccess } = useNotify();
    const form = ref({
      email: "",
      password: "",
    });

    onMounted(() => {
      const isSessionExpired = route.query.sessionExpired;
      if (isSessionExpired) {
        notifyError("Sessão expirada, faça login novamente!");
      }
      if (isLogged()) {
        router.push({ name: "home" });
      }
    });

    const handleLogin = async () => {
      try {
        await login(form.value);
        notifySuccess("Login realizado com sucesso!");
        router.replace({ name: "home" });
      } catch (error) {
        notifyError(error?.response?.data?.message);
      }
    };

    return {
      form,
      handleLogin,
    };
  },
});
</script>
