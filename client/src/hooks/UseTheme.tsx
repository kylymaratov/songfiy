import { useEffect, useState } from 'react';

export const UseTheme = () => {
  const [mode, setMode] = useState<string>('dark');

  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleMode = () => {};

  return (
    <div>
      <button>Mode</button>
    </div>
  );
};
