import React, { useContext } from "react";
import "./App.css";
import RootStore from "./RootStore";
import AppRouter from "./AppRouter";

const RootStoreContext = React.createContext(new RootStore());

export const rootContext = (): RootStore => useContext(RootStoreContext);

const App: React.FC = () => {
  return <AppRouter />;
};

export default App;
