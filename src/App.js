import React from 'react';
import './App.css';
import { useUser } from './common/hooks/useUser';
import Routes from './common/router/Routes';

function App() {

  const {isAuthenticating} = useUser()
//return user ? <Dashboard /> : <Login />
return (
  !isAuthenticating && <Routes/>
)
}

export default App;