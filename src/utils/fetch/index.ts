import axios from 'axios';

const baseURL: string = '';

/** 全局通用请求 */
const request = axios.create({
  baseURL,
  timeout: 10 * 1000,
});

export default request;

export type AxiosRequestFn = (...args: unknown[]) => Promise<unknown>;

type QueryParam = Record<string, unknown>;

type BodyParams = QueryParam | unknown[];

/** GET 通用请求 */
export const get = (url: string, query?: QueryParam) => request.get(url, {});

/** POST 通用请求 */
export const post = (url: string, body?: BodyParams, query?: QueryParam) =>
  request.post(url, {});
