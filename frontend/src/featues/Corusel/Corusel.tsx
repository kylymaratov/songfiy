import { useRef } from 'react';
import { TMusic } from 'src/types/music-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SquareSong } from '../Song/SquareSong';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';

interface Props {
  songs: TMusic[];
  spaceBetween?: number;
  slidePreView?: number;
}

export const Corusel: React.FC<Props> = ({
  songs,
  spaceBetween = 15,
  slidePreView = 7,
}) => {
  const swiperRef = useRef<any>(null);

  if (!songs.length)
    return <div className="text-center">There is currently no content</div>;

  return (
    <div className="flex items-center relative">
      <button className="absolute -left-8">
        <MdNavigateBefore
          size={26}
          onClick={() => swiperRef.current?.slidePrev()}
        />
      </button>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={spaceBetween}
        slidesPerView={slidePreView}
      >
        {songs.map((song, id) => (
          <SwiperSlide key={id}>
            <div className="mt-2 flex items-center">
              <SquareSong song={song} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="absolute -right-8">
        <MdNavigateNext
          size={26}
          onClick={() => swiperRef.current?.slideNext()}
        />
      </button>
    </div>
  );
};
