<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title v-if="authUser">
          Olá, {{ authUser.name }}!
        </q-toolbar-title>

        <div>
          <q-btn
            outline
            round
            color="white"
            text-color="white"
            icon="logout"
            @click="handleLogout"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const { authUser, logout } = useAuthUser();
    const router = useRouter();
    const $q = useQuasar();

    const handleLogout = async () => {
      $q.dialog({
        title: "Sair",
        message: "Deseja realmente sair?",
        cancel: true,
        persistent: true,
        ok: "Sair",
        cancel: "Cancelar",
      }).onOk(async () => {
        await logout();
        router.replace({ name: "login" });
      });
    };

    return {
      authUser,
      handleLogout,
    };
  },
});
</script>
