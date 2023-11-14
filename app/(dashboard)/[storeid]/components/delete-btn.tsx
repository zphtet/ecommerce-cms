"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { AiOutlineDelete } from "react-icons/ai";

const DeleteBtn = ({
  handler,
  loading,
}: {
  handler: () => void;
  loading: boolean;
}) => {
  const clickHandler = () => {
    return handler();
  };
  return (
    <Button
      className={`bg-red-600 text-white text-xl  rounded-md `}
      onClick={clickHandler}
      disabled={loading}
      variant={"destructive"}
    >
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <AiOutlineDelete />
      )}
    </Button>
  );
};

export default DeleteBtn;
