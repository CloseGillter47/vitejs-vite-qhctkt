///////////////////////////////////////////////////////////////////////////////////////////
//
//  fetch 状态管理
//  功能：提供请求器以及状态
//
//
///////////////////////////////////////////////////////////////////////////////////////////

import { useCallback, useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import { Axios } from 'axios';
import request from './index';

/** 内部状态 */
interface FetchState {
  token?: string;
  request: Axios;
}

const fetchState = atom<FetchState>({
  key: 'fetchState',
  default: {
    request,
  },
});

type useFetchStateResult = [FetchState, () => void];

export function useFetchState(): useFetchStateResult {
  const [{ request, token }, updateState] = useRecoilState(fetchState);

  // TOKEN 发生变化时，重新生成拦截器
  useEffect(() => {
    let rid: number;
    let sid: number;
    if (token) {
      rid = request.interceptors.request.use((config) => {
        return config;
      });

      sid = request.interceptors.response.use((response) => {
        return response;
      });
    }

    return () => {
      if (rid) {
        request.interceptors.request.eject(rid);
        request.interceptors.response.eject(sid);
      }
    };
  }, [token, request]);

  const update = useCallback(() => {}, []);

  return [
    {
      token,
      request,
    },
    () => {},
  ];
}
