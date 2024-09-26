import { useState } from 'react';
import { CiPlay1 } from 'react-icons/ci';
import { useAppDispatch } from 'src/store/hooks';
import { setPlayNow } from 'src/store/slices/player-slice';
import { TMusic } from 'src/types/music-types';

interface Props {
  song: TMusic;
}

export const SquareSong: React.FC<Props> = ({ song }) => {
  const dispatch = useAppDispatch();
  const [showPlayButton, setShowPlayButton] = useState<boolean>(false);

  return (
    <div
      className="bg-backgroundSecondary p-2 rounded-md cursor-pointer m-aut h-[220px]"
      onMouseEnter={() => setShowPlayButton(true)}
      onMouseLeave={() => setShowPlayButton(false)}
    >
      <div className="relative">
        <img
          width={200}
          src={`https://i3.ytimg.com/vi/${song.musicId}/hqdefault.jpg`}
          alt="cover"
          className="rounded-lg opacity-80 hover:opacity-100 duration-200"
        />
        {showPlayButton && (
          <button
            onClick={() => dispatch(setPlayNow(song))}
            className="absolute right-2 bottom-2  bg-orange-600 p-1 rounded-full text-white"
            type="button"
          >
            <CiPlay1 size={22} />
          </button>
        )}
      </div>
      <div className="mt-5">
        <p className="text-[15px]">
          {song.title?.slice(0, 25) || 'Title unknown'}
        </p>
        <p className="text-[12px] text-gray-300">{song.author.slice(0, 20)}</p>
      </div>
    </div>
  );
};
