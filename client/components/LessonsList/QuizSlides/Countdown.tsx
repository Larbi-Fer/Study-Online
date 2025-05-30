import { useEffect, useRef, useState } from 'react';

const Countdown = ({ seconds, stop }: { seconds: number; stop: boolean }) => {
  const [percent, setPercent] = useState(100);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (stop) return;

    setPercent(100);
    const decrementAmount = 100 / (seconds * 10);

    intervalRef.current = setInterval(() => {
      setPercent((prev) => {
        const next = prev - decrementAmount;
        if (next <= 0) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return next;
      });
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [stop, seconds]);

  return (
    <div className="countdown" style={{ width: `${percent}%` }}>
      <span></span>
    </div>
  );
};

export default Countdown;