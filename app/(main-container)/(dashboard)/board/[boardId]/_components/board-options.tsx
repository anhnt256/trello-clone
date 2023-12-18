"use client";

import { toast } from "sonner";
import { Ban, MoreHorizontal, Trash, X } from "lucide-react";

import { deleteBoard } from "@/actions/delete-board";
import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormSubmit } from "@/components/form/form-submit";
import { useState } from "react";

interface BoardOptionsProps {
  id: string;
}

export const BoardOptions = ({ id }: BoardOptionsProps) => {
  const [confirmPopOverOpen, setConfirmPopOverOpen] = useState<boolean>(false);
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = () => {
    execute({ id });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="transparent">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Board actions
        </div>
        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>

        <Popover open={confirmPopOverOpen} onOpenChange={setConfirmPopOverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
            >
              Delete this board
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <h1>Are you sure you want to delete? </h1>
            <div className="flex justify-end mt-4">
              <Button
                variant="gray"
                className="w-20 justify-start mr-2"
                size="inline"
                onClick={onDelete}
                disabled={isLoading}
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </Button>
              <Button
                onClick={() => setConfirmPopOverOpen(false)}
                variant="gray"
                className="w-20 justify-start"
                size="inline"
              >
                <Ban className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </PopoverContent>
    </Popover>
  );
};
