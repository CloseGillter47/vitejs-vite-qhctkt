import { useCallback } from 'react';
import { useFetchState } from './axios';
import { AxiosRequestFn } from './index';

export default function useAxios<T>(fetchFn: AxiosRequestFn) {
  const [{ request }] = useFetchState();

  const run = useCallback(async () => {}, []);
}
