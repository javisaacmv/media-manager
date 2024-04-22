import mediaService from "@/services/media";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type Props = {
  id: string;
  open: boolean;
};

export const useMediaById = ({ id, open }: Props) => {
  return useQuery({
    queryKey: ["useMediaById", id, open],
    queryFn: async () => {
      if (!open) return undefined;
      const result = await mediaService.getById(id);
      return result.data || [];
    },
  });
};
