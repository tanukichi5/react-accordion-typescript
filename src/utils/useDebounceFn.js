/**
* @see {@link https://chaika.hatenablog.com/entry/2020/01/20/080000}
*/
// useDebounceFn.js
import { useRef, useCallback } from 'react';

export const useDebounceFn = (fn, delay = 100) => {
  const timer = useRef(null);

  const dispatch = useCallback((_val) => {
    timer.current && clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      fn(_val);
    }, delay);
  }, [fn, delay, timer]);

  return [dispatch];
};

