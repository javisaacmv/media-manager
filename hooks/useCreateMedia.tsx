import mediaService from "@/services/media";
import usersService from "@/services/users";
import { useAuthStore } from "@/stores/authStore";
import { Content, CreateUserType } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useCreateMedia = () => {
  return useMutation({
    mutationKey: ["useCreateMedia"],
    mutationFn: async (body: Content) => {
      const result = await mediaService.create(body);

      return result?.data;
    },
  });
};
