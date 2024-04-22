import usersService from "@/services/users";
import { useAuthStore } from "@/stores/authStore";
import { CreateUserType } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useCreateUser = (isRegister?: boolean) => {
  return useMutation({
    mutationKey: ["useCreateUser"],
    mutationFn: async (body: CreateUserType) => {
      let result;
      if (isRegister) {
        result = await usersService.register(body);
      } else {
        result = await usersService.createUser(body);
      }

      return result?.data;
    },
  });
};
