import { useMemo } from 'react';
import { CiStreamOn } from 'react-icons/ci';
import { CiCloudOn } from 'react-icons/ci';
import { IconType } from 'react-icons';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { CiSearch, CiHome } from 'react-icons/ci';
import { PiPlaylistDuotone } from 'react-icons/pi';

interface MenuList {
  title: string;
  href: string;
  icon: IconType;
}

export const FixedMenu: React.FC = () => {
  const navigate = useNavigate();

  const { currentLocation } = useAppSelector((state) => state.app);

  const menuList: MenuList[] = useMemo(
    () => [
      {
        title: 'Home',
        href: '/',
        icon: CiHome,
      },
      {
        title: 'Search',
        href: '/search',
        icon: CiSearch,
      },
      {
        title: 'Radio',
        href: '/radio',
        icon: CiStreamOn,
      },
    ],
    [],
  );

  const menuList2: MenuList[] = useMemo(
    () => [
      {
        title: 'Playlists',
        href: '/my-playlists',
        icon: PiPlaylistDuotone,
      },
      {
        title: 'Favorite',
        href: '/favorite',
        icon: CiCloudOn,
      },
      {
        title: 'Saved',
        href: '/saved',
        icon: CiCloudOn,
      },
    ],
    [],
  );

  return (
    <div className="p-4 h-full shadow-slate-800 shadow-md w-[250px] overflow-hidden">
      <p className="text-start mb-2 text-sm text-gray-400">Navigation</p>
      <div className="pt-2 pb-2">
        {menuList.map((el, key) => (
          <div
            onClick={() => navigate(el.href)}
            key={key}
            className={`first:mt-0 flex p-2 items-center hover:dark:bg-gray-800 mt-2 mb-2 rounded-md cursor-pointer ${
              currentLocation === el.href ? 'dark:bg-gray-800' : ''
            }`}
          >
            <el.icon size={21} />
            <span className="ml-5 text-gray-300 text-sm">{el.title}</span>
          </div>
        ))}
      </div>
      <p className="text-start text-sm text-gray-400">Playlist and favorite</p>
      <div className="pt-2 pb-2 border-b-2 border-b-slate-800">
        {menuList2.map((el, key) => (
          <div
            onClick={() => navigate(el.href)}
            key={key}
            className={`flex p-2 items-center hover:dark:bg-gray-800 mt-2 mb-2 rounded-md cursor-pointer ${
              currentLocation === el.href ? 'dark:bg-gray-800' : ''
            }`}
          >
            <el.icon size={21} />
            <span className="ml-5 text-gray-300 text-sm">{el.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
