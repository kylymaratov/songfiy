import { FaPlayCircle } from 'react-icons/fa';
import {
  MdOutlineSkipPrevious,
  MdOutlineSkipNext,
  MdOutlineFavoriteBorder,
} from 'react-icons/md';
import { MdShuffle } from 'react-icons/md';
import { MdRepeat } from 'react-icons/md';
import { UsePlayer } from './player-controls';
import { Range } from '../Range/Range';
import { Ref, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { FaPauseCircle } from 'react-icons/fa';
import { MdOutlineQueueMusic } from 'react-icons/md';
import { MdFullscreen } from 'react-icons/md';
import { MdOutlineHighQuality } from 'react-icons/md';
import { FaVolumeDown } from 'react-icons/fa';
import { FaVolumeUp } from 'react-icons/fa';
import { FaVolumeMute } from 'react-icons/fa';
import { LiaDownloadSolid } from 'react-icons/lia';
import { MdHighQuality } from 'react-icons/md';
import { setFullScreen } from 'src/store/slices/player-slice';
import { Tooltip } from '../Tooltip/Tooltip';

interface Props {
  elementRef: Ref<HTMLDivElement>;
}

export const Player: React.FC<Props> = ({ elementRef }) => {
  const dispatch = useAppDispatch();

  const { searchOnFocus } = useAppSelector((state) => state.app);
  const { playNow, fullScreen } = useAppSelector((state) => state.player);
  const {
    currentTime,
    duration,
    paused,
    times,
    loadProgress,
    volume,
    repeat,
    shuffle,
    quality,
    setPlayOrPause,
    setQuality,
    setVolumeOnClick,
    setRepeat,
    setShuffle,
    setCurrentTimeOnClick,
  } = UsePlayer();

  const pauseMusic = (event: KeyboardEvent) => {
    if (event.keyCode === 32 && !searchOnFocus) {
      event.preventDefault();
      setPlayOrPause();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', pauseMusic);

    return () => document.removeEventListener('keydown', pauseMusic);
  }, [paused, searchOnFocus]);

  return (
    <div
      ref={elementRef}
      className={`z-10 p-2 pr-4 pl-4 ${fullScreen ? 'bg-black' : 'bg-backgroundSecondary'} w-full fixed bottom-0 left-0 bg-gray-dark flex justify-between items-center`}
    >
      <div className="flex w-[30vw] justify-start items-center">
        {playNow && (
          <img
            src={`https://i3.ytimg.com/vi/${playNow?.musicId}/hqdefault.jpg`}
            alt="cover"
            width={60}
            height={60}
            className="rounded-md"
          />
        )}
        <div className="ml-4">
          <p className="text-slate-100"> {playNow?.title}</p>
          <p className="text-sm  dark:text-slate-300">{playNow?.author}</p>
        </div>
        {playNow && (
          <div className="ml-10">
            <Tooltip title="Add to favorite">
              <button className="mr-6 text-red-400">
                <MdOutlineFavoriteBorder size={22} />
              </button>
            </Tooltip>
          </div>
        )}
      </div>
      <div className="w-[40vw]">
        <div className="m-auto w-full flex items-center justify-center">
          <button
            type="button"
            className={`mr-4 ${repeat && 'text-blue-400'}`}
            onClick={() => setRepeat(!repeat)}
          >
            <MdRepeat size={22} />
          </button>
          <button
            type="button"
            disabled={!playNow}
            className="disabled:text-gray-400"
          >
            <MdOutlineSkipPrevious size={26} />
          </button>
          <button
            type="button"
            className="ml-3 mr-3 hover:scale-95 disabled:text-gray-400"
            onClick={setPlayOrPause}
            disabled={!playNow}
          >
            {paused ? <FaPlayCircle size={28} /> : <FaPauseCircle size={28} />}
          </button>
          <button
            type="button"
            disabled={!playNow}
            className="disabled:text-gray-400"
          >
            <MdOutlineSkipNext size={26} />
          </button>
          <button type="button" onClick={() => setShuffle(!shuffle)}>
            <MdShuffle
              size={22}
              className={`ml-4 ${shuffle && 'text-blue-400'}`}
            />
          </button>
        </div>
        <div className="flex justify-center items-center mt-1.5">
          <span className="text-sm font-normal text-slate-300 mr-3">
            {times.start}
          </span>
          <Range
            width={550}
            progress={loadProgress}
            current={(currentTime / duration) * 100}
            max={duration}
            onChange={setCurrentTimeOnClick}
          />
          <span className="text-sm font-normal text-slate-300 ml-3">
            -{times.end}
          </span>
        </div>
      </div>
      <div className="flex w-[30vw] justify-end items-center">
        <Tooltip title="Quality">
          <button
            type="button"
            className="mr-5"
            onClick={() => setQuality(quality === 'low' ? 'high' : 'low')}
          >
            {quality === 'high' ? (
              <MdHighQuality size={26} />
            ) : (
              <MdOutlineHighQuality size={26} />
            )}
          </button>
        </Tooltip>
        <Tooltip title="Save">
          <button
            type="button"
            className="mr-5 disabled:text-gray-400"
            disabled={!playNow}
          >
            <LiaDownloadSolid size={22} />
          </button>
        </Tooltip>
        <Tooltip title="Queue">
          <button
            type="button"
            className="mr-5 disabled:text-gray-400"
            disabled={!playNow}
          >
            <MdOutlineQueueMusic size={22} />
          </button>
        </Tooltip>

        <div className="mr-5 flex items-center">
          <button
            type="button"
            className="mr-2"
            onClick={() =>
              volume === 0 ? setVolumeOnClick(50) : setVolumeOnClick(0)
            }
          >
            {volume === 0 ? (
              <FaVolumeMute size={20} />
            ) : volume > 70 ? (
              <FaVolumeUp size={20} />
            ) : (
              <FaVolumeDown size={20} />
            )}
          </button>
          <Range
            width={100}
            max={100}
            current={volume}
            onChange={setVolumeOnClick}
          />
        </div>
        <button
          type="button"
          disabled={!playNow}
          className="disabled:text-gray-400"
          onClick={() => dispatch(setFullScreen(!fullScreen))}
        >
          <MdFullscreen size={20} />
        </button>
      </div>
    </div>
  );
};
