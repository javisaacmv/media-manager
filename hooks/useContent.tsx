import mediaService from "@/services/media";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type Props = {
  orderBy?: "SUBJECT" | "TYPE" | "DEFAULT";
  searchByTitle?: string;
  searchBySubject?: string;
};

export const useContent = ({
  orderBy,
  searchBySubject,
  searchByTitle,
}: Props) => {
  return useQuery({
    queryKey: ["useContent", orderBy, searchBySubject, searchByTitle],
    queryFn: async () => {
      const order = orderBy === "DEFAULT" ? "" : orderBy;
      if (searchByTitle) {
        const result = await mediaService.getAll(
          `/title/${searchByTitle}/${order || ""}`
        );
        return result.data || [];
      }

      if (searchBySubject) {
        const result = await mediaService.getAll(
          `/subject/${searchBySubject}/${order || ""}`
        );
        return result.data || [];
      }

      const result = await mediaService.getAll(`/${order || ""}`);
      return result.data || [];
    },
  });
};
