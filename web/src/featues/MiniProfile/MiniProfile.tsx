import { ReactNode, useState } from 'react';
import { UseVisible } from '../../hooks/UseVisible';
import { userInfo } from '../../mocks/user-mock';
import { apiRequest } from 'src/api/api';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { setAuth, setUser } from 'src/store/slices/user-slice';

interface MiniProfileProps {
  children: ReactNode;
}

export const MiniProfile: React.FC<MiniProfileProps> = ({ children }) => {
  const [showProifle, setShowProfile] = useState<boolean>(false);
  const { ref } = UseVisible(() => setShowProfile(false));
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);
  const showProifleHandler = () => setShowProfile(!showProifle);

  const logout = async () => {
    try {
      await apiRequest('/auth/logout');

      dispatch(setAuth(false));
      dispatch(setUser(null));
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={showProifleHandler}
        className="text-white bg-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
      >
        {children}
      </button>

      {showProifle && (
        <div className="absolute z-10 right-3 top-14 w-[320px] text-sm text-gray-500 transition-opacity duration-300   border   rounded-lg shadow-sm  dark:text-gray-400 bg-backgroundSecondary border-gray-600">
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <img
                className="w-10 h-10 rounded-full"
                src="https://www.shareicon.net/data/512x512/2015/09/18/103160_man_512x512.png"
                alt="Jese Leos"
              />
              <div>
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Go profile
                </button>
              </div>
            </div>
            <p className="text-base font-semibold leading-none text-gray-900 dark:text-white">
              {user?.info?.firstname
                ? `${user?.info?.firstname} ${user?.info?.lastname}`
                : null}
            </p>
            <p className="text-sm font-normal">{user?.email}</p>
            <p className="mb-3 text-sm font-normal">{userInfo.listen_now}</p>
            <p className="mb-4 text-sm">{user?.info?.about}</p>
            <ul className="flex text-sm">
              <li className="me-2">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {userInfo.listened_songs}{' '}
                </span>
                <span>Listened songs</span>
              </li>
              <li>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {userInfo.favorites}
                </span>{' '}
                <span>In favorites</span>
              </li>
            </ul>

            <div className="flex justify-center">
              <button
                onClick={logout}
                type="button"
                className="text-white mt-7 bg-red-500 w-full  focus:ring-4   font-medium rounded-lg text-xs px-3 py-1.5"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
