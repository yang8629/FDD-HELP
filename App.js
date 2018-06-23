import React from 'react';
import { DrawerRouter } from './src/Router';
import { Database } from './src/components/config/firebase';

const App = () => (
  <DrawerRouter>
    <Database />
  </DrawerRouter>
);

export default App;
