import { useAppSelector } from 'src/store/hooks';

import { SearchResult } from 'src/featues/SearchResult/SearchResult';

export const SearchPage: React.FC = () => {
  const { searchResult } = useAppSelector((state) => state.search);

  if (searchResult.length) return <SearchResult searchResult={searchResult} />;

  return <div>Nothing</div>;
};
