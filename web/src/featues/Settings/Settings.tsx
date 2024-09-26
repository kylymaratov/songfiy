import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Helemt } from '../Helmet/Helmet';

export const Settings: React.FC = () => {
  const dispatch = useAppDispatch();

  const { showSettings } = useAppSelector((state) => state.app);

  if (!showSettings) return;

  return (
    <Helemt>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-1/2 z-10">
        <div className="bg-backgroundSecondary p-4">
          <h1 className="font-bold text-lg">Settings</h1>
        </div>
      </div>
    </Helemt>
  );
};
