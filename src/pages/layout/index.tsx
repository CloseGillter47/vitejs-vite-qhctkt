import { Popups } from '@/components/Popup/popup';
import {} from 'react';
import { Outlet } from 'react-router-dom';
import ss from './styles.module.less';

export default function Layout() {
  return (
    <main className={ss.root}>
      <Outlet />
      <Popups />
    </main>
  );
}
