import { useEffect, useRef, useState } from 'react';
import { TMusic } from 'src/types/music-types';
import { useAppSelector } from 'src/store/hooks';

interface Times {
  start: string;
  end: string;
}

type Quality = 'low' | 'high';

export const UsePlayer = () => {
  const [times, setTimes] = useState<Times>({
    start: '00:00',
    end: '00:00',
  });
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(50);
  const [paused, setPaused] = useState<boolean>(true);
  const [repeat, setRepeat] = useState<boolean>(false);
  const [shuffle, setShuffle] = useState<boolean>(false);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [quality, setQuality] = useState<Quality>('low');

  const { playNow } = useAppSelector((state) => state.player);

  const audioRef = useRef<HTMLAudioElement>(new Audio());

  const setCurrentTimeOnClick = (incomingTime: number): void => {
    audioRef.current.currentTime = incomingTime;
    setCurrentTime(incomingTime);
  };

  const setVolumeOnClick = (incomingVolume: number): void => {
    audioRef.current.volume = incomingVolume / 100;
    setVolume(incomingVolume);
  };

  const startPlayer = (track: TMusic): void => {
    try {
      const audioSource = `http://localhost:3000/api/v1/music/listen/${track.musicId}`;

      setLoadProgress(0);

      audioRef.current.src = audioSource;
    } catch (e) {
      alert((e as Error).message);
    }
  };

  const setPlayOrPause = () => {
    if (audioRef.current.paused) {
      setPaused(false);
      return audioRef.current.play();
    }
    audioRef.current.pause();
    setPaused(true);
  };

  const setNext = () => {};
  const setPrev = () => {};

  const handleTimeUpdate = (): void => {
    const progress: number =
      audioRef.current.buffered.length > 0
        ? (audioRef.current.buffered.end(0) / audioRef.current.duration) * 100
        : 0;
    setLoadProgress(Math.floor(progress));

    const newCurrentTime: number = parseInt(
      Number(audioRef.current.currentTime).toFixed(0),
    );
    setCurrentTime(newCurrentTime);
  };

  const handleFormatDuration = (incomingTime: number): string => {
    const minute = Math.floor(incomingTime / 60);
    const secondLeft = incomingTime - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  };

  const handleLoadedMetadata = (incomingDuration: number): void => {
    setDuration(incomingDuration);
    setPlayOrPause();
  };

  const handleOnError = (error: string | ErrorEvent) => {
    if (typeof error === 'string') return;

    alert(error.message);
  };

  useEffect(() => {
    if (playNow) {
      startPlayer(playNow);
      audioRef.current.onloadedmetadata = () =>
        handleLoadedMetadata(playNow.duration);
    }
  }, [playNow]);

  /* Effects */
  useEffect(() => {
    audioRef.current.autoplay = false;
    audioRef.current.onerror = handleOnError as OnErrorEventHandler;
    audioRef.current.ontimeupdate = handleTimeUpdate;
  }, []);

  useEffect(() => {
    setTimes({
      start: handleFormatDuration(currentTime),
      end: handleFormatDuration(duration - currentTime),
    });
  }, [currentTime, duration]);

  return {
    currentTime,
    duration,
    paused,
    repeat,
    shuffle,
    volume,
    loadProgress,
    times,
    quality,
    setNext,
    setPaused,
    setPrev,
    setRepeat,
    startPlayer,
    setVolumeOnClick,
    setCurrentTime,
    setShuffle,
    setQuality,
    setPlayOrPause,
    setCurrentTimeOnClick,
  };
};
