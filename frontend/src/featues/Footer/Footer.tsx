import { Link } from 'react-router-dom';
import { BiLogoGmail } from 'react-icons/bi';
import { FaTelegramPlane } from 'react-icons/fa';

export const Footer: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-around">
        <div className="w-[30%] mt-5 mb-5">
          <Link to="/about" style={{ fontSize: 22, fontWeight: 'bold' }}>
            About
          </Link>
          <p className="text=[12px] text-gray-300">
            Melodies is a website that has been created for over 5 year’s now
            and it is one of the most famous music player website’s in the
            world. in this website you can listen and download songs for free.
            also of you want no limitation you can buy our premium pass’s.
          </p>
        </div>
        <div className="w-[30%] mt-5 mb-5 m-auto">
          <h1>Сontact developer</h1>
          <p className="text=sm text-gray-300 mt-2 flex items-center">
            <BiLogoGmail />
            <a href="kylymaratov@gmail.com" className="ml-2">
              Gmail
            </a>
          </p>
          <p className="text=sm text-gray-300 mt-2 items-center flex">
            <FaTelegramPlane />
            <a href="https://t.me/kylymaratov" className="ml-2">
              Telegram
            </a>
          </p>
        </div>
        <div className="w-[30%] mt-5 mb-5 m-auto">
          <h1>Community</h1>
          <p className="text=sm text-gray-300 mt-2 flex items-center">
            <BiLogoGmail />
            <a href="kylymaratov@gmail.com" className="ml-2">
              Gmail
            </a>
          </p>
          <p className="text=sm text-gray-300 mt-2 items-center flex">
            <FaTelegramPlane />
            <a href="https://t.me/kylymaratov" className="ml-2">
              Telegram
            </a>
          </p>
        </div>
      </div>
      <hr className="border-none h-0.5 bg-gray-600" />
      <p className="mt-4 text-sm text-gray-400 text-end">© 2024 Songfiy</p>
    </div>
  );
};
