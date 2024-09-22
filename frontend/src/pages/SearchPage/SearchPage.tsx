import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { CiPlay1 } from 'react-icons/ci';
import { setPlayNow } from 'src/store/slices/player-slice';
import { Song } from 'src/featues/Song/Song';

export const SearchPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchResult } = useAppSelector((state) => state.search);

  if (!searchResult.length) return <div>Nothing</div>;

  return (
    <div className="flex p-4 justify-start w-[80vw] m-auto">
      <div className="w-1/4">
        <h3 className="font-bold text-lg">#1</h3>
        <div className="bg-slate-800 rounded-md pl-4 pt-2 pb-2 pr-4 relative hover:scale-105 duration-100">
          <img
            className="rounded-lg opacity-80"
            src={`https://i3.ytimg.com/vi/${searchResult[0].musicId}/hqdefault.jpg`}
            alt="cover"
          />
          <p className="text-md mt-4">{searchResult[0].title}</p>
          <p className="font-bold text-sm mt-2">{searchResult[0].author}</p>
          <button
            onClick={() => dispatch(setPlayNow(searchResult[0]))}
            className="absolute right-3 bottom-2 bg-slate-900 p-2 rounded-full hover:text-blue-500"
          >
            <CiPlay1 size={25} />
          </button>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <div className="w-[90%]">
          {searchResult.slice(1, searchResult.length).map((song, id) => (
            <div key={song.musicId} className="mt-3 flex items-center">
              <p className="font-bold">#{id + 2}</p>
              <div className="ml-2 w-full">
                <Song song={song} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
