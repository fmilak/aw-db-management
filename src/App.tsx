import React, {useContext, useEffect} from 'react';
import './App.css';
import RootStore from './RootStore';
import AppRouter from './AppRouter';
import {configure} from 'mobx';

configure({enforceActions: 'always'});

export const RootStoreContext = React.createContext(new RootStore());

const App: React.FC = () => {
    return <AppRouter />;
};

export default App;
