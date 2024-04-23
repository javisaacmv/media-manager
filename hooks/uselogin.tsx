import usersService from "@/services/users";
import { useAuthStore } from "@/stores/authStore";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const setUserData = useAuthStore((state) => state.setUserData);
  const setToken = useAuthStore((state) => state.setToken);
  return useMutation({
    mutationKey: ["useLogin"],
    mutationFn: async (body: { email: string; password: string }) => {
      const { email, password } = body;
      const result = await usersService.login(email, password);
      console.log(result);
      setUserData(result.data.user);
      setToken(result.data.token);

      return result.data;
    },
  });
};
