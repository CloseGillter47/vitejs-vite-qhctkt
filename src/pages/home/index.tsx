import { useNotification } from '@/components/Popup/popup';
import { useEffect } from 'react';

import ss from './styles.module.less';

export default function HomePage() {
  const { show } = useNotification();
  useEffect(() => {
    window.setTimeout(() => {
      console.log('show message --------------->');
      show('123');
    }, 5 * 1000);
  }, []);
  return (
    <section className={ss.root}>
      <div>HOME</div>
    </section>
  );
}
