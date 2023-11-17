import { CldImage } from "next-cloudinary";
import { AiOutlineDelete } from "react-icons/ai";

const ImgCard = ({
  imgUrl,
  handler,
}: {
  imgUrl: string;
  handler?: (url: string) => void;
}) => {
  const whthUrlHandler = handler?.bind(null, imgUrl);
  return (
    <div className="border  relative w-max ">
      <div
        className="w-max px-2 py-2 absolute rounded cursor-pointer  bg-red-600 text-white right-1 top-1 hover:opacity-80 "
        onClick={whthUrlHandler}
      >
        <AiOutlineDelete />
      </div>
      <CldImage width={"200"} height={"400"} src={imgUrl} alt={imgUrl} />
    </div>
  );
};

export default ImgCard;
