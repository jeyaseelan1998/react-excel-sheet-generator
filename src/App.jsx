import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Guest = lazy(() => import('./Layout/Guest'));
const Protected = lazy(() => import('./Layout/Protected'));
const ProtectedAdmin = lazy(() => import('./Layout/ProtectedAdmin'));
const NotFound = lazy(() => import('./Layout/NotFound'));

const Login = lazy(() => import('./Pages/Login'));
const Home = lazy(() => import('./Pages/Home'));
const History = lazy(() => import('./Pages/History'));
const BillEntryForm = lazy(() => import('./Pages/BillEntry/Form'));

const Admin = lazy(() => import('./Pages/Admin'));

const App = () => {
  return (
    <Routes>
      <Route path='/guest' element={<Guest />}>
        <Route path='login' element={<Login />} />
      </Route>
      <Route path='/' element={<Protected />}>
        <Route index element={<Home />} />
        <Route path='bill-entry/create' element={<BillEntryForm />} />
        <Route path='history' element={<History />} />
      </Route>
      <Route path='/admin' element={<ProtectedAdmin />}>
        <Route index element={<Admin />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App;