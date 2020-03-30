import React from 'react';
import './App.css';
import RootStore from "./RootStore";
import AppRouter from "./AppRouter";

export const RootStoreContext = React.createContext(new RootStore());

const App: React.FC = () => {
  return (
      <RootStoreContext.Provider value={new RootStore()}>
        <AppRouter />
      </RootStoreContext.Provider>

  );
};

export default App;
