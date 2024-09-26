import { useEffect } from 'react';
import { apiRequest } from 'src/api/api';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { setMostPlayedMusic, setTopMusic } from 'src/store/slices/music-slice';
import { TMusic } from 'src/types/music-types';

export const UseContent = () => {
  const dispatch = useAppDispatch();
  const { mostPlayedMusic, topMusic } = useAppSelector((state) => state.music);

  const getTopMusic = async () => {
    try {
      if (topMusic.length) return;

      const response = await apiRequest<TMusic[]>('/music/top?limit=50');
      dispatch(setTopMusic(response));
    } catch (error) {}
  };

  const getMostPlayedMusic = async () => {
    try {
      if (mostPlayedMusic.length) return;
      const response = await apiRequest<TMusic[]>(
        '/music/most-played?limit=50',
      );
      dispatch(setMostPlayedMusic(response));
    } catch (error) {}
  };

  useEffect(() => {
    getTopMusic();
    getMostPlayedMusic();
  }, []);
};
