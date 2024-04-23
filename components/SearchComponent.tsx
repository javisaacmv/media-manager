import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type Props = {
  orderBy: string;
  setOrderBy: (val: "SUBJECT" | "TYPE" | "") => void;
  searchByTitle: string;
  setSearchByTitle: (val: string) => void;
  searchBySubject: string;
  setSearchBySubject: (val: string) => void;
};

export const SearchComponent = ({
  searchByTitle,
  setSearchByTitle,
  searchBySubject,
  setSearchBySubject,
  orderBy,
  setOrderBy,
}: Props) => {
  return (
    <Card className={"w-full mt-5 p-3 m-3"}>
      <CardContent className="flex flex-row justify-between items-center">
        <Input
          id="name"
          placeholder="Search by title"
          className="w-1/3 self-auto"
          value={searchByTitle}
          onChange={(e) => setSearchByTitle(e.target.value)}
        />
        <Input
          id="name"
          placeholder="Search by subject"
          className="w-1/3"
          value={searchBySubject}
          onChange={(e) => setSearchBySubject(e.target.value)}
        />
        <Select
          value={orderBy}
          onValueChange={(value: "SUBJECT" | "TYPE" | "") => setOrderBy(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Order by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="DEFAULT">default</SelectItem>
              <SelectItem value="SUBJECT">Subject</SelectItem>
              <SelectItem value="TYPE">Type</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};
