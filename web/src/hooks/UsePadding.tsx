import { useEffect, useRef, useState } from 'react';

export const UsePadding = () => {
  const [padding, setPadding] = useState<number>(90);
  const [bottomPadding, setBottomPadding] = useState<number>(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const upRef = useRef<HTMLDivElement>(null);

  const updatePadding = () => {
    if (bottomRef.current && upRef.current) {
      const playerHeight = bottomRef.current.getBoundingClientRect().height;
      const navbarHeight = upRef.current.getBoundingClientRect().height;

      setBottomPadding(playerHeight);
      setPadding(playerHeight + navbarHeight);
    }
  };
  useEffect(() => {
    updatePadding();

    const resizeObserver = new ResizeObserver(() => {
      updatePadding();
    });

    if (bottomRef.current) {
      resizeObserver.observe(bottomRef.current);
    }

    if (bottomRef.current) {
      resizeObserver.observe(bottomRef.current);
    }

    window.addEventListener('resize', updatePadding);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updatePadding);
    };
  }, []);

  return { padding, bottomRef, upRef, bottomPadding };
};
