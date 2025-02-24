import { IconSearch, IconHeart, IconCategory2 } from '@tabler/icons-react';

export const Header: React.FC = () => {
  return (
    <div className="items-center flex justify-between py-2">
      <div className="">
        <button type="button" className="cursor-pointer">
          <IconCategory2 stroke={1} size={24} />
        </button>
      </div>
      <div>
        <div className="p-1.5 flex items-center text-sm justify-center border border-gray-500 w-lg rounded-lg">
          <IconSearch stroke={1} size={22} />
          <input
            className="ml-2 outline-none border-none w-full dark:text-white text-black"
            placeholder="Search songs by name, artist, keywoards"
          />
        </div>
      </div>
      <div className="flex items-center justify-end">
        <button type="button" className="cursor-pointer">
          <IconHeart size={24} stroke={1} />
        </button>
      </div>
    </div>
  );
};
