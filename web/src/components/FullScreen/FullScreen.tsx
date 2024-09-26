import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  setShowAuthorization,
  setShowSettings,
} from 'src/store/slices/app-slice';
import { setFullScreen } from 'src/store/slices/player-slice';

interface Props {
  bottomPadding: number;
}

export const FullScreen: React.FC<Props> = ({ bottomPadding }) => {
  const dispatch = useAppDispatch();
  const { fullScreen, playNow } = useAppSelector((state) => state.player);
  const { showSettings, showAuthorization } = useAppSelector(
    (state) => state.app,
  );

  const closeFullscreen = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && fullScreen) {
      event.preventDefault();
      dispatch(setFullScreen(false));
    }
    if (event.key === 'Escape' && showSettings) {
      event.preventDefault();
      dispatch(setShowSettings(false));
    }
    if (event.key === 'Escape' && showAuthorization) {
      event.preventDefault();
      dispatch(setShowAuthorization(false));
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeFullscreen);

    return () => document.removeEventListener('keydown', closeFullscreen);
  }, [fullScreen, showSettings, showAuthorization]);

  return (
    <div
      className={`${fullScreen && playNow ? 'top-0' : '-top-full'} z-10 bg-black duration-300 absolute w-full h-full`}
      style={{ paddingBottom: `${bottomPadding}px` }}
    >
      <img
        src={`https://i3.ytimg.com/vi/${playNow?.musicId}/hqdefault.jpg`}
        alt="cover"
        className="w-full m-auto h-full bg-center bg-top opacity-70"
      />
    </div>
  );
};
