import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import axios from "axios";
import { useRouter } from "next/navigation";

export function EditDictionary({ dictionaryContent }: any) {
  const { word, meaning, id } = JSON.parse(dictionaryContent);
  const router = useRouter();
  async function handleEditDictionary() {
    await axios.post("/api/dict/editDictionary", {
      word: (document.getElementById("word") as HTMLInputElement)?.value || "",
      meaning:
        (document.getElementById("meaning") as HTMLInputElement)?.value || "",
      id,
    });

    router.refresh();
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className=" w-full cursor-pointer hover:bg-gray-100 py-1 px-3">
          Edit
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Word
            </Label>
            <Input id="word" defaultValue={word} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Meaning
            </Label>
            <Input id="meaning" defaultValue={meaning} className="col-span-3" />
          </div>
        </div>
        <DialogClose className=" w-fit ml-auto">
          <div
            className=" rounded w-fit py-1.5 px-2 border hover:bg-gray-100 cursor-pointer"
            onClick={handleEditDictionary}
          >
            Save changes
          </div>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
