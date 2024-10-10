import Link from "next/link";
import { FC } from "react";

interface ShowSearchProps {}

const ShowSearch: FC<ShowSearchProps> = ({}) => {
  return (
    <Link href={"/"} className="hover:bg-gray-200/50 rounded-md px-6 py-2">
      <div className="flex gap-2">
        <img
          src="hero/img/promo.png"
          alt="alt"
          className="min-w-10 max-w-10 h-auto object-cover bg-white rounded-md p-1"
        />
        <div className="flex flex-col leading-loose">
          <p className="text-lg font-semibold capitalize text-gray-800">
            title
          </p>
          <p className="text-gray-600/70 text-sm font-medium">text</p>
        </div>
      </div>
    </Link>
  );
};

export default ShowSearch;
