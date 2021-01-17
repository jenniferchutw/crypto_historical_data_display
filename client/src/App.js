import React from 'react';
import { GlobalStyle } from './base/GlobalStyle';
import CoinDisplay from './CoinDisplay';

import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <CoinDisplay />
    </RecoilRoot>
  );
}

export default App;
