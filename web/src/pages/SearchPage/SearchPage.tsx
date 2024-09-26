import { useAppSelector } from 'src/store/hooks';

import { SearchResult } from 'src/featues/SearchResult/SearchResult';
import { useEffect } from 'react';

export const SearchPage: React.FC = () => {
  const { searchResult } = useAppSelector((state) => state.search);

  useEffect(() => {}, []);

  if (searchResult.length) return <SearchResult searchResult={searchResult} />;

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <p>To search, start typing words</p>
      </div>
    </div>
  );
};
