"use client";

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
    <button
      className={`bg-red-600 text-white text-xl px-1 py-1 rounded-md ${
        loading && "opacity-80"
      }`}
      onClick={clickHandler}
      disabled={loading}
    >
      <AiOutlineDelete />
    </button>
  );
};

export default DeleteBtn;
