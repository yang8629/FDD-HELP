import React from 'react';
import { DrawerRouter } from './src/Router';
import Database from './src/components/config/firebase';

function SetFirebase() {
  Database.init()
};

var abc = SetFirebase();

const App = () => (
<DrawerRouter />
);

export default App;
