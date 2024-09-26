import { ReactNode, useState } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

export const Tooltip: React.FC<Props> = ({ title, children }) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && (
        <p className="absolute flex-nowrap text-nowrap text-center rounded-lg p-1 -top-10 left-[50%] translate-x-[-70%] text-[12px]  bg-slate-600">
          {title}
        </p>
      )}
      {children}
    </div>
  );
};
