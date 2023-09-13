import { useQuasar } from "quasar";

export default function useNotify() {
  const $q = useQuasar();

  const notifySuccess = (message) => {
    $q.notify({
      message: message || "Sucesso!",
      color: "positive",
      position: "top",
      icon: "check_circle"
    });
  };

  const notifyError = (message) => {
    $q.notify({
      message: message || "Erro!",
      color: "negative",
      position: "top",
      icon: "error"
    });
  };

  return {
    notifySuccess,
    notifyError
  };
}
