import { useEffect, useState } from 'react';
import { apiRequest } from 'src/api/api';
import MainBanner from 'src/assets/banner.png';
import { FaArrowRight } from 'react-icons/fa6';
import { TMusic } from 'src/types/music-types';
import { LineSong } from 'src/featues/Song/LineSong';
import { SiNeteasecloudmusic } from 'react-icons/si';
import { Footer } from 'src/featues/Footer/Footer';
import { RxUpdate } from 'react-icons/rx';

import 'swiper/css';
import 'swiper/css/scrollbar';
import { Corusel } from 'src/featues/Corusel/Corusel';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [topMusic, setTopMusic] = useState<TMusic[]>([]);
  const [mostPlayedMusic, setMostPlayedMusic] = useState<TMusic[]>([]);
  const [randomMusic, setRandomMusic] = useState<TMusic[]>([]);
  const getTopMusic = async () => {
    try {
      const response = await apiRequest<TMusic[]>('/music/top?limit=15');

      setTopMusic(response);
    } catch (error) {}
  };

  const getMostPlayedMusic = async () => {
    try {
      const response = await apiRequest<TMusic[]>(
        '/music/most-played?limit=15',
      );

      setMostPlayedMusic(response);
    } catch (error) {}
  };

  const getRandomMusic = async () => {
    try {
      const response = await apiRequest<TMusic[]>('/music/random?limit=10');

      setRandomMusic(response);
    } catch (error) {}
  };

  useEffect(() => {
    getTopMusic();
    getMostPlayedMusic();
    getRandomMusic();
  }, []);

  return (
    <div className="w-[90%] m-auto p-4">
      <div className="relative overflow-hidden">
        <img
          className="w-full h-[600px] opacity-50"
          src={MainBanner}
          alt="banner"
        />
        <div className="absolute top-[50%] left-[10%] translate-y-[-50%] translate-x-[-10%] w-[30%]  ">
          <h1 className="text-[30px] font-bold">
            All the <span className="text-pink-500">Best Songs</span> <br /> in
            One Place
          </h1>
          <p className="mt-5">
            On our website, you can access an amazing collection of popular and
            new songs. Stream your favorite tracks in high quality and enjoy
            without interruptions. Whatever your taste in music, we have it all
            for you!
          </p>
          <div className="mt-10 flex justify-start items-center">
            <button
              className="pt-2 pb-2 pl-10 pr-10 bg-purple-500 rounded-md"
              onClick={() => navigate('/discover')}
            >
              Discover
            </button>
            <button className="ml-10 pt-2 pb-2 pl-10 pr-10 border-blue-500 border rounded-md text-blue-500">
              Create playlist
            </button>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">
            Top songs of <span className="text-green-500">all time</span>
          </h2>
          <button className="text-sm flex items-center text-blue-300">
            View all <FaArrowRight style={{ marginLeft: 10 }} />
          </button>
        </div>
        <div className="mt-2">
          <Corusel songs={topMusic} />
        </div>
      </div>
      <div className="mt-16">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">
            <span className="text-orange-400"> Top listened songs</span> of all
            time
          </h2>
          <button className="text-sm flex items-center text-green-300">
            View all <FaArrowRight style={{ marginLeft: 10 }} />
          </button>
        </div>
        <div className="mt-2">
          <Corusel songs={mostPlayedMusic} />
        </div>
      </div>
      <div className="mt-16">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">
            Random <span className="text-blue-400">songs</span>
          </h2>
          <button
            className="flex items-center text-sm"
            onClick={getRandomMusic}
          >
            Refresh
            <RxUpdate size={18} style={{ marginLeft: 10 }} />
          </button>
        </div>
        <div className="mt-2 w-full flex items-center justify-between">
          <div className="w-[48%]">
            {randomMusic.length
              ? randomMusic.slice(0, 5).map((song, id) => (
                  <div className="mt-2 flex items-center" key={id}>
                    <span className="text-sm font-bold">#{id + 1}</span>
                    <div className="w-full ml-1">
                      <LineSong song={song} />
                    </div>
                  </div>
                ))
              : null}
          </div>
          <div className="w-[48%]">
            {randomMusic.length
              ? randomMusic.slice(5, randomMusic.length).map((song, id) => (
                  <div className="mt-2 flex items-center" key={id}>
                    <span className="text-sm font-bold">#{id + 6}</span>
                    <div className="w-full ml-1">
                      <LineSong song={song} />
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
      <div className="mt-20 mb-20 font-bold text-[22px] flex justify-center">
        <button
          className="flex items-center"
          onClick={() => navigate('/discover')}
        >
          <SiNeteasecloudmusic size={25} style={{ marginRight: 10 }} /> More
          music
          <FaArrowRight style={{ marginLeft: 10, marginRight: 10 }} />
          <span className="text-purple-500"> Discover</span>
        </button>
      </div>
      <Footer />
    </div>
  );
};
