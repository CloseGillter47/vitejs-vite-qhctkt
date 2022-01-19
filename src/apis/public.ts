import { get, post } from '@/utils/fetch';

/** 请求信息 */
export const fetchInfo = (id: string) => get('/info', { id });
