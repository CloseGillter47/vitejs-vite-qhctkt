import { useState } from 'react';
import { RecoilRoot } from 'recoil';
import Routes from '@/routes';
import '@/styles/global.less';

function App() {
  const [count, setCount] = useState(0);

  return (
    <RecoilRoot>
      <Routes />
    </RecoilRoot>
  );
}

export default App;
