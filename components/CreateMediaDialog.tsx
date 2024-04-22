import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/uselogin";
import { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useUploadImage } from "@/hooks/useUploadImage";
import { useCreateMedia } from "@/hooks/useCreateMedia";
import { Content } from "@/types";
import { useAuthStore } from "@/stores/authStore";
import { Textarea } from "./ui/textarea";

export function CreateMediaDialog() {
  const user = useAuthStore((state) => state.user);

  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [subject, setSubject] = useState("");
  const [displayImage, setDisplayImage] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");

  const { mutateAsync: uploadImgMutate } = useUploadImage();

  const {
    mutateAsync: createMediaMutation,
    isPending,
    isSuccess,
  } = useCreateMedia();

  const handleDisplayImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDisplayImage(e.target.files[0]);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    let displayImgUrl = null;
    let imageUrl = null;
    if (displayImage) {
      const displayImgData = new FormData();
      displayImgData.append("img", displayImage);
      displayImgUrl = await uploadImgMutate(displayImgData);
    }

    if (image) {
      const imgData = new FormData();
      imgData.append("img", image);
      imageUrl = await uploadImgMutate(imgData);
    }

    const variables: Content = {
      type,
      title,
      text,
      subject,
      displayImg: displayImgUrl.file,
      img: imageUrl?.file,
      videoUrl,
      author: user?.username as string,
    };

    await createMediaMutation(variables);
  };

  useEffect(() => {
    if (type === "TEXT") {
      setImage(null);
      setVideoUrl("");
    }
    if (type === "VIDEO") {
      setImage(null);
      setText("");
    }
    if (type === "IMAGE") {
      setText("");
      setVideoUrl("");
    }
  }, [type]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Media</Button>
      </DialogTrigger>
      <DialogContent className="w-3/4">
        <DialogHeader>
          <DialogTitle>Create Media</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Type
            </Label>
            <Select
              value={type}
              onValueChange={(value: string) => setType(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Choose a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="TEXT">Text</SelectItem>
                  <SelectItem value="IMAGE">Image</SelectItem>
                  <SelectItem value="VIDEO">Video</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subject" className="text-right">
              Subject
            </Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="displayImage" className="text-right">
              Display image
            </Label>
            <Input
              id="displayImage"
              // value={displayImage}
              onChange={(e) => handleDisplayImageChange(e)}
              className="col-span-3"
              type="file"
            />
          </div>
          {type === "TEXT" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="text" className="text-right">
                Text
              </Label>
              <Textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="col-span-3"
              />
            </div>
          )}
          {type === "VIDEO" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="videoUrl" className="text-right">
                Video URL
              </Label>
              <Input
                id="videoUrl"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="col-span-3"
              />
            </div>
          )}
          {type === "IMAGE" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <Input
                id="image"
                // value={displayImage}
                onChange={(e) => handleImageChange(e)}
                className="col-span-3"
                type="file"
              />
            </div>
          )}
        </div>
        <DialogFooter>
          {!isSuccess ? (
            <Button onClick={handleSubmit} disabled={isPending}>
              {isPending && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create
            </Button>
          ) : (
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
