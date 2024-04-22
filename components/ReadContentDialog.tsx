import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/uselogin";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useMediaById } from "@/hooks/useMediaById";
import Image from "next/image";

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
  id: string;
};

export function ReadContentDialog({ open, id, setOpen }: Props) {
  const { data } = useMediaById({ id, open });
  const media = data?.media;
  console.log(data);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {media && (
        <DialogContent className="w-10/12">
          <DialogHeader>
            <DialogTitle>{media?.title}</DialogTitle>
          </DialogHeader>
          <div className="">
            <div className="">
              <img
                className="w-full"
                src={media?.displayImg}
                alt="display image"
              />
            </div>
            <div className="mt-7">
              {media.type === "TEXT" && <p className="w-full">{media.text}</p>}
              {media.type === "IMAGE" && (
                <img className="w-full" src={media?.img} alt="display image" />
              )}
              {media.type === "VIDEO" && (
                <iframe
                  className="w-full h-fit"
                  src={`https://www.youtube.com/embed/${media.videoUrl}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              )}
            </div>
          </div>
          <span>{`posted by: ${media.author}`}</span>
          <DialogFooter>
            <DialogClose asChild className="justify-between">
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
