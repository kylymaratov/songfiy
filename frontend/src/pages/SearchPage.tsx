import { BsSearch } from 'react-icons/bs';

export const SearchPage: React.FC = () => {
  return (
    <div className="flex justify-center rounded-lg items-center w-[30vw] dark:bg-gray-900 pl-3 pr-3">
      <span>
        <BsSearch />
      </span>
      <input
        className="ml-2 text-md outline-none border-2 border-collapse pt-2 pb-2 bg-transparent border-none w-full"
        placeholder="Search by title, author, keywords"
      />
    </div>
  );
};
