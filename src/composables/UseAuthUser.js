import { ref } from "vue";
import { api } from "boot/axios";

const authUser = ref(null);

const storedUser = localStorage.getItem("authUser");
if (storedUser) {
  authUser.value = JSON.parse(storedUser);
}

export default function useAuthUser() {
  const login = async ({ email, password }) => {
    try {
      const response = await api.post("auth/login", { email, password });
      localStorage.setItem("token", response.data.data.access_token);
      const user = await api.get("auth/user");
      localStorage.setItem("authUser", JSON.stringify(user.data));
      authUser.value = user.data;
    } catch (error) {
      throw error;
    }
  };

  const isLogged = () => {
    return authUser.value !== null;
  };

  const register = async ({ name, email, password }) => {
    try {
      const response = await api.post("auth/register", {
        name,
        email,
        password
      });
      localStorage.setItem("token", response.data.data.access_token);
      const user = await api.get("auth/user");
      authUser.value = user.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post("auth/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("authUser");
      authUser.value = null;
    } catch (error) {
      throw error;
    }
  };

  return { authUser, login, register, logout, isLogged };
}
