import { useEffect } from 'react';

const useHotkeys = (keyCombo: {key: string}[], callback: () => void) => {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (keyCombo.every((keyObj) => keyObj.key.toLowerCase() === e.key.toLowerCase())) {
        callback(); // Trigger the callback when keys are pressed
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeydown);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [keyCombo, callback]);
};

export default useHotkeys;
