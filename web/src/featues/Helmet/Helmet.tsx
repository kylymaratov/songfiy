import { ReactNode, useMemo } from 'react';

interface Props {
  children: ReactNode;
}

export const Helemt: React.FC<Props> = ({ children }) => {
  return (
    <div className={`fixed inset-0 w-full h-full z-10 duration-200`}>
      <div className="absolute w-full h-full bg-background opacity-50" />
      <div className="relative w-full h-full">{children}</div>
    </div>
  );
};
