import mediaService from "@/services/media";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type Props = {
  orderBy?: "SUBJECT" | "TYPE" | "";
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
      if (searchByTitle) {
        const result = await mediaService.getAll(
          `/title/${searchByTitle}/${orderBy || ""}`
        );
        return result.data || [];
      }

      if (searchBySubject) {
        const result = await mediaService.getAll(
          `/subject/${searchBySubject}/${orderBy || ""}`
        );
        return result.data || [];
      }

      const result = await mediaService.getAll(`/${orderBy || ""}`);
      return result.data || [];
    },
  });
};
