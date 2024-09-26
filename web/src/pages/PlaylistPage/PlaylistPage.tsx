import { useEffect } from 'react';
import { apiRequest } from 'src/api/api';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { setMyPlaylists, TPlaylist } from 'src/store/slices/playlist-slice';

export const PlaylistPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { myPlaylists } = useAppSelector((state) => state.playlist);

  const getPlaylits = async () => {
    try {
      const response = await apiRequest<TPlaylist[]>('/playlist/my');

      dispatch(setMyPlaylists(response));
    } catch (error) {}
  };

  useEffect(() => {
    getPlaylits();
  }, []);

  return (
    <div className="w-[90%] m-auto p-4">
      <div className="flex justify-between">
        <h1 className="font-bold text-[18px]">Your playlists</h1>

        <button type="button" className="px-5 bg-blue-700 rounded-lg text-sm">
          Create
        </button>
      </div>
      <div>
        {myPlaylists.length ? (
          <div></div>
        ) : (
          <div className="text-center mt-16">
            <p>
              You don't have any playlists yet, create your first playlist by
              clicking on the create button
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
