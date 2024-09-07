import { track_mock } from "../../mocks/track-mock";
import { FaPlayCircle } from "react-icons/fa";
import { MdOutlineSkipPrevious, MdOutlineSkipNext } from "react-icons/md";
import { MdShuffle } from "react-icons/md";
import { MdRepeat } from "react-icons/md";
import { UsePlayer } from "./UsePlayer";
import { Range } from "../Range/Range";
import { Ref, useEffect } from "react";
import { setPlayNows } from "../../store/slices/player-slice";
import { useAppDispatch } from "../../store/hooks";
import { FaPauseCircle } from "react-icons/fa";
import { MdOutlineQueueMusic } from "react-icons/md";
import { MdFullscreen } from "react-icons/md";
import { MdOutlineHighQuality } from "react-icons/md";
import { FaVolumeDown } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";
import { FaVolumeMute } from "react-icons/fa";
import { LiaDownloadSolid } from "react-icons/lia";
import { MdHighQuality } from "react-icons/md";

interface Props {
    elementRef: Ref<HTMLDivElement>;
}

export const Player: React.FC<Props> = ({ elementRef }) => {
    const {
        currentTime,
        duration,
        paused,
        times,
        loadProgress,
        volume,
        hightQuality,
        setPlayOrPause,
        setHightQuality,
        setVolumeOnClick,
        setCurrentTimeOnClick,
    } = UsePlayer();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPlayNows(track_mock));
    }, []);

    return (
        <div
            ref={elementRef}
            className="p-2 pr-4 pl-4 dark:bg-slate-800 w-full fixed bottom-0 left-0 bg-gray-dark flex justify-between items-center"
        >
            <div className="flex w-[30vw] justify-start">
                <img
                    src={track_mock.cover}
                    alt="cover"
                    width={60}
                    height={60}
                    className="rounded-md"
                />
                <div className="ml-2">
                    <p className="text-slate-100"> {track_mock.title}</p>
                    <p className="text-sm font-bold dark:text-slate-300">
                        {track_mock.author}
                    </p>
                </div>
            </div>
            <div className="w-[40vw]">
                <div className="m-auto w-full flex items-center justify-center">
                    <button type="button" className="mr-4">
                        <MdRepeat size={22} />
                    </button>
                    <button type="button">
                        <MdOutlineSkipPrevious size={26} />
                    </button>
                    <button
                        type="button"
                        className="ml-3 mr-3 hover:scale-95"
                        onClick={setPlayOrPause}
                    >
                        {paused ? (
                            <FaPlayCircle size={28} />
                        ) : (
                            <FaPauseCircle size={28} />
                        )}
                    </button>
                    <button type="button">
                        <MdOutlineSkipNext size={26} />
                    </button>
                    <button type="button">
                        <MdShuffle size={22} className="ml-4" />
                    </button>
                </div>
                <div className="flex justify-center items-center mt-1.5">
                    <span className="text-sm font-thin text-slate-300 mr-3">
                        {times.start}
                    </span>
                    <Range
                        width={550}
                        progress={loadProgress}
                        current={(currentTime / duration) * 100}
                        max={duration}
                        onChange={setCurrentTimeOnClick}
                    />
                    <span className="text-sm font-thin text-slate-300 ml-3">
                        -{times.end}
                    </span>
                </div>
            </div>
            <div className="flex w-[30vw] justify-end items-center">
                <button
                    type="button"
                    className="mr-5"
                    onClick={() => setHightQuality(!hightQuality)}
                >
                    {hightQuality ? (
                        <MdHighQuality size={26} />
                    ) : (
                        <MdOutlineHighQuality size={26} />
                    )}
                </button>
                <button type="button" className="mr-5">
                    <LiaDownloadSolid size={22} />
                </button>
                <button type="button" className="mr-5">
                    <MdOutlineQueueMusic size={22} />
                </button>

                <div className="mr-5 flex items-center">
                    <button
                        type="button"
                        className="mr-2"
                        onClick={() =>
                            volume === 0
                                ? setVolumeOnClick(50)
                                : setVolumeOnClick(0)
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
                <button type="button" className="">
                    <MdFullscreen size={20} />
                </button>
            </div>
        </div>
    );
};
