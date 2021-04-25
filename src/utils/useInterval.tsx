import { useEffect, useRef } from "react";

export function useInterval(callback: () => void, delay: number) {
  // const savedCallback = useRef<ReturnType<typeof setInterval>>();

  const savedCallback = useRef(callback);
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    if (!!delay) {
      const id = setInterval(() => savedCallback.current(), delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
}
