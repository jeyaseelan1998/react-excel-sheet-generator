import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Protected from './Layout/Protected';

const Guest = lazy(() => import('./Layout/Guest'));
const Login = lazy(() => import('./Pages/Login'));
const Home = lazy(() => import('./Pages/Home'));

const App = () => {
  return (
    <Routes>
      <Route path='/guest' element={<Guest />}>
        <Route path='login' element={<Login />} />
      </Route>
      <Route path='*' element={<Protected />}>
        <Route index element={<h1>Page Not Found</h1>} />
      </Route>
    </Routes>
  )
}

export default App;