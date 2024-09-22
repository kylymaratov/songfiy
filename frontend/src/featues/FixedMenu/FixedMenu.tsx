import { useMemo } from 'react';
import { CiStreamOn } from 'react-icons/ci';
import { CiCloudOn } from 'react-icons/ci';
import { IconType } from 'react-icons';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { CiSearch, CiHome } from 'react-icons/ci';
import { PiPlaylistDuotone } from 'react-icons/pi';
import { RiCompassDiscoverLine } from 'react-icons/ri';

interface MenuList {
  title: string;
  href: string;
  icon: IconType;
  color?: string;
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
        color: '#a855f7',
      },
      {
        title: 'Discover',
        href: '/discover',
        icon: RiCompassDiscoverLine,
        color: '#ef4444',
      },
      {
        title: 'Search',
        href: '/search',
        icon: CiSearch,
        color: '#ec4899',
      },
      {
        title: 'Radio',
        href: '/radio',
        icon: CiStreamOn,
        color: '#0ea5e9',
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
    <div
      className={`p-4 h-full shadow-[0px_0_5px_0_rgba(100,116,139,0.5)] w-[250px] overflow-hidden`}
    >
      <p className="text-start mb-2 text-sm text-gray-400">Navigation</p>
      <div className="pt-2 pb-2">
        {menuList.map((el, key) => (
          <div
            onClick={() => navigate(el.href)}
            key={key}
            className={`first:mt-0 flex p-2 items-center duration-200  mt-2 mb-2 rounded-md cursor-pointer`}
            style={
              currentLocation === el.href
                ? { backgroundColor: el.color, marginLeft: 5 }
                : {}
            }
          >
            <el.icon size={21} />
            <span className="ml-5 text-gray-300 text-sm">{el.title}</span>
          </div>
        ))}
      </div>
      <p className="text-start text-sm text-gray-400">Playlist and favorite</p>
      <div className="pt-2 pb-2 border-b-2 border-b-backgroundSecondary">
        {menuList2.map((el, key) => (
          <div
            onClick={() => navigate(el.href)}
            key={key}
            className={`flex p-2 duration-200 items-center hover:dark:bg-gray-800 mt-2 mb-2 rounded-md cursor-pointer ${
              currentLocation === el.href ? 'bg-gray-800 scale-105' : ''
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
