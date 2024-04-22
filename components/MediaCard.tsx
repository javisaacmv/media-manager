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
import { ContentItem } from "@/types";
import { ReadContentDialog } from "./ReadContentDialog";

type Props = {
  content: ContentItem;
  canRead: boolean;
};

export const MediaCard = ({ content, canRead }: Props) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Card
      style={{ backgroundImage: `url('${content.displayImg}')` }}
      className={"w-full "}
    >
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
        <CardDescription>{content.subject}</CardDescription>
        <CardDescription>{content.type}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-between">
        {canRead && <Button onClick={() => setOpen(true)}>Read</Button>}
      </CardFooter>
      <ReadContentDialog open={open} setOpen={setOpen} id={content._id || ""} />
    </Card>
  );
};
