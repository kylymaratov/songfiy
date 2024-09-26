import { LineSong } from 'src/featues/Song/LineSong';
import { useAppSelector } from 'src/store/hooks';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export const MostPlayedSongsPage: React.FC = () => {
  const navigate = useNavigate();
  const { mostPlayedMusic } = useAppSelector((state) => state.music);

  return (
    <div className="w-[90%] m-auto p-4">
      <div className="flex justify-between">
        <button type="button" className="flex" onClick={() => navigate(-1)}>
          <IoArrowBack size={18} />
          <span className="text-sm ml-2">back</span>
        </button>
        <h2 className="text-lg font-bold">
          <span className="text-orange-400">Top listened songs</span> of all
        </h2>
      </div>

      <div className="mt-7">
        {mostPlayedMusic.map((song, id) => (
          <div className="mt-2 flex items-center" key={id}>
            <span className="text-sm font-bold">#{id + 1}</span>
            <div className="w-full ml-1">
              <LineSong song={song} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
