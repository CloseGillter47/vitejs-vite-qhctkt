import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { atom, useRecoilState } from 'recoil';

/** 生成唯一key */
export function UUID(): string {
  const temp_url = URL.createObjectURL(new Blob());
  const uuid = temp_url.toString();
  URL.revokeObjectURL(temp_url); // 释放内存占用
  return uuid.replace(/^(.+)\/(.+)$/g, '$2');
}

export interface PopupInfo {
  x?: number | string;
  y?: number | string;
  type?: string;
  remain?: number;
  element?: ReactNode;
}

/** 内部状态 */
interface Model {
  /** 弹框数据集合 */
  popups: Record<string, Map<string, PopupInfo>>;
}

const popup = atom<Model>({
  key: 'PopupState',
  default: {
    popups: {},
  },
});

type usePopupStateResult = {
  state: Model;
  clear: () => void;
  create: (info: PopupInfo) => string;
  remove: (uuid: string, type?: string) => void;
};

export default function usePopupState(): usePopupStateResult {
  const [state, updateState] = useRecoilState(popup);
  const { popups } = state;

  useEffect(() => {
    console.log(0, popups);
  }, [popups]);

  /** 新增 */
  const create = useCallback(
    (info: PopupInfo) => {
      const { type = 'DEFAULT' } = info;
      const uuid = UUID();
      const _popups = { ...popups };
      if (!_popups[type]) {
        _popups[type] = new Map<string, PopupInfo>();
      }
      _popups[type].set(uuid, info);
      updateState((oldVal) => ({ ...oldVal, popups: _popups }));

      return uuid;
    },
    [popups, updateState]
  );

  /** 删除 */
  const remove = useCallback(
    (uuid: string, type: string = 'DEFAULT') => {
      console.log('popups >>', popups);
      if (!popups[type]) return;
      popups[type].delete(uuid);
      updateState((oldVal) => ({ ...oldVal, popups }));
    },
    [popups, updateState]
  );

  /** 清空 */
  const clear = useCallback(() => {
    updateState((oldVal) => ({ ...oldVal, popups: {} }));
  }, [popups, updateState]);

  return {
    state,
    clear,
    create,
    remove,
  };
}
