import { useAppSelector } from 'src/store/hooks';

import { SearchResult } from 'src/featues/SearchResult/SearchResult';
import { useEffect } from 'react';

export const SearchPage: React.FC = () => {
  const { searchResult } = useAppSelector((state) => state.search);

  useEffect(() => {}, []);

  if (searchResult.length) return <SearchResult searchResult={searchResult} />;

  return <div>Nothing</div>;
};
