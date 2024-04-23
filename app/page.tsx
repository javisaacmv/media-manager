"use client";
import { MediaCard } from "@/components/MediaCard";
import { SearchComponent } from "@/components/SearchComponent";
import { Skeleton } from "@/components/ui/skeleton";
import { useContent } from "@/hooks/useContent";
import { useAuthStore } from "@/stores/authStore";
import { ContentItem } from "@/types";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [searchByTitle, setSearchByTitle] = React.useState("");
  const [searchBySubject, setSearchBySubject] = React.useState("");
  const [orderBy, setOrderBy] = React.useState<"SUBJECT" | "TYPE" | "DEFAULT">(
    "DEFAULT"
  );
  const [countByType, setCountByType] = useState({});

  const user = useAuthStore((state) => state.user);
  const canRead = !!user;

  const { data, isLoading } = useContent({
    searchByTitle,
    searchBySubject,
    orderBy,
  });

  const getCountByType = () => {
    if (!data) return;
    let types = {
      VIDEO: 0,
      TEXT: 0,
      IMAGE: 0,
    };
    data.media.forEach((m: { type: keyof typeof types }) => {
      types[m.type] = !types[m.type] ? 1 : types[m.type] + 1;
    });
    setCountByType(types);
  };

  const countByTypeKeys = Object.keys(
    countByType
  ) as (keyof typeof countByType)[];

  useEffect(() => {
    getCountByType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="h-5/6 flex flex-col justify-between">
      <div>
        {" "}
        <div className="w-full flex flex-col justify-items-center p-6">
          <SearchComponent
            searchByTitle={searchByTitle}
            setSearchByTitle={setSearchByTitle}
            searchBySubject={searchBySubject}
            setSearchBySubject={setSearchBySubject}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
          />
        </div>
        <div className="grid grid-cols-4 gap-4 dark p-6">
          {data?.media &&
            data?.media.map((m: ContentItem) => (
              <MediaCard content={m} key={m._id} canRead={canRead} />
            ))}
          {isLoading && (
            <>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <footer className="flex flex-row justify-end p-5">
        {countByTypeKeys.map((key) => (
          <p className="mr-3" key={key}>{` ${key}: ${countByType[key]} `}</p>
        ))}
        total items: {data?.media.length}
      </footer>
    </div>
  );
}
