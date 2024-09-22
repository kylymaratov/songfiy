import { TMusic } from 'src/types/music-types';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { CiPlay1 } from 'react-icons/ci';
import { useState } from 'react';
import { useAppDispatch } from 'src/store/hooks';
import { setPlayNow } from 'src/store/slices/player-slice';
import { useNavigate } from 'react-router-dom';
import { IoIosStar } from 'react-icons/io';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { UseVisible } from 'src/hooks/UseVisible';
import { TfiDownload } from 'react-icons/tfi';
import { MdOutlinePlaylistAdd } from 'react-icons/md';
import { Tooltip } from '../Tooltip/Tooltip';

interface Props {
  song: TMusic;
}

export const Song: React.FC<Props> = ({ song }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState<boolean>(false);

  const { ref } = UseVisible(() => setShowMenu(false));

  const handleFormatDuration = (incomingTime: number): string => {
    const minute = Math.floor(incomingTime / 60);
    const secondLeft = incomingTime - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  };

  const [showPlayButton, setShowPlayButton] = useState<boolean>(false);

  return (
    <div>
      <div
        className="flex items-center p-2 justify-between"
        onMouseEnter={() => setShowPlayButton(true)}
        onMouseLeave={() => setShowPlayButton(false)}
      >
        <div className="flex items-center w-[50%]">
          <div className="relative">
            <img
              width={55}
              src={`https://i3.ytimg.com/vi/${song.musicId}/hqdefault.jpg`}
              alt="cover"
              className="rounded-lg"
            />
            {showPlayButton && (
              <button
                onClick={() => dispatch(setPlayNow(song))}
                className="absolute top-[13%] left-[25%]  bg-background p-1 rounded-full text-blue-200"
                type="button"
              >
                <CiPlay1 size={22} />
              </button>
            )}
          </div>
          <div
            className="ml-4 cursor-pointer"
            onClick={() => navigate(`/music/${song.musicId}`)}
          >
            <p className="text-md">
              {song.title?.slice(0, 40) || 'Title unknown'}
            </p>
            <p className="text-sm">{song.author}</p>
          </div>
        </div>
        <div className="text-sm flex items-center w-[50%] justify-end">
          {song.isOfficial && (
            <IoIosStar
              size={16}
              color="aqua"
              style={{ marginRight: 15, opacity: 0.8 }}
            />
          )}
          <p className="mr-4">{song.uploadDate}</p>
          <Tooltip title="Add to favorite">
            <button className="mr-6 text-red-400">
              <MdOutlineFavoriteBorder size={22} />
            </button>
          </Tooltip>

          <p className="mr-5">{handleFormatDuration(song.duration)}</p>

          <div className="relative">
            <button type="button" onClick={() => setShowMenu(!showMenu)}>
              <HiOutlineDotsHorizontal size={23} />
            </button>
            <div
              className={`${showMenu ? 'scale-1' : 'scale-0'} duration-150 w-auto -left-16 pt-3 z-10 pb-3 pl-4 pr-4 absolute flex-nowrap text-nowrap bg-backgroundSecondary rounded-lg shadow-lg`}
              ref={ref}
            >
              <div>
                <button
                  type="button"
                  className="text-sm mt-2  hover:text-blue-400 flex items-center"
                >
                  <MdOutlinePlaylistAdd size={20} />
                  <span className="ml-2">Add to playlist</span>
                </button>
                <button
                  type="button"
                  className="text-sm mt-4 text-center hover:text-blue-400 flex items-center"
                >
                  <TfiDownload size={18} />
                  <span className="ml-2">Save</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
