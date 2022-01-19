import { useRef } from 'react';

export default function useNow<T>(value: T) {
  const ref = useRef<T>(value);

  ref.current = value;

  return ref.current;
}
