import useNow from '@/hooks/useNow';
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import usePopupState from '../Popup/state';

export interface Props {
  container?: Element;
}

export function Popups(props: Props) {
  const { container = document.body } = props;
  const { popups } = usePopupState().state;

  const elements = useMemo<ReactNode[]>(() => {
    const nodes: ReactNode[] = [];
    Object.keys(popups).map((type) => {
      popups[type].forEach((v, k) => {
        nodes.push(<div key={`${type}-${k}`}>{v.element}</div>);
      });
    });
    return nodes;
  }, [popups]);

  return createPortal(<div id="popups">{elements}</div>, container);
}

export default function usePopup() {}

const TR_X = 0;
const TR_Y = 0;

export function useNotification() {
  const timer = useRef<Map<string, number | null>>(
    new Map<string, number | null>()
  );
  const { remove, create } = usePopupState();

  /** 关闭消息框 */
  const hide = useCallback(
    (uuid: string, type: string = 'NOTIFICATION_TR') => {
      if (!uuid) return;
      remove(uuid, type);
      const ticket = timer.current.get(uuid);
      if (ticket) {
        window.clearTimeout(ticket);
        timer.current.delete(uuid);
      }
    },
    [remove]
  );

  useEffect(() => {}, []);

  /** 显示消息框 */
  const show = useCallback(
    (message: string) => {
      const daly = 5;
      const type = 'NOTIFICATION_TR';
      const uuid = create({
        x: TR_X,
        y: TR_Y,
        type,
        remain: 5,
        element: <div>{message}</div>,
      });
      if (daly > 0) {
        const ticket = window.setTimeout(() => {
          console.log('--------> timeout');
          hide(uuid, type);
          window.clearTimeout(ticket);
        }, daly * 1000);

        timer.current.set(uuid, ticket);
      }

      return uuid;
    },
    [create]
  );

  return {
    show,
    hide,
  };
}
