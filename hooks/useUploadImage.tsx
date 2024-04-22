import mediaService from "@/services/media";
import usersService from "@/services/users";
import { useAuthStore } from "@/stores/authStore";
import { CreateUserType } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useUploadImage = () => {
  return useMutation({
    mutationKey: ["useUploadImage"],
    mutationFn: async (body: any) => {
      const result = await mediaService.uploadImg(body);

      return result?.data;
    },
  });
};
