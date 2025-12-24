import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';

import { Spinner } from './components';

const Guest = lazy(() => import('./Layout/Guest'));
const Protected = lazy(() => import('./Layout/Protected'));
const ProtectedAdmin = lazy(() => import('./Layout/ProtectedAdmin'));
const NotFound = lazy(() => import('./Layout/NotFound'));

const Login = lazy(() => import('./Pages/Login'));
const Home = lazy(() => import('./Pages/Home'));
const History = lazy(() => import('./Pages/History'));
const BillEntry = lazy(() => import('./Pages/BillEntry'));
const BillEntryForm = lazy(() => import('./Pages/BillEntry/Form'));

const Admin = lazy(() => import('./Pages/Admin'));

const SuspendPage = (element) => {
  return (
    <Suspense fallback={<div className='suspense-page-loading'><Spinner /></div>}>
      {element}
    </Suspense>
  )
}

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/guest' element={SuspendPage(<Guest />)}>
          <Route path='login' element={SuspendPage(<Login />)} />
        </Route>
        <Route path='/' element={SuspendPage(<Protected />)}>
          <Route index element={SuspendPage(<Home />)} />
          <Route path='bill-entry/create' element={SuspendPage(<BillEntryForm />)} />
          <Route path='bill-entry/:bill_no' element={SuspendPage(<BillEntryForm />)} />
          <Route path='bill-entry' element={SuspendPage(<BillEntry />)} />
          <Route path='history' element={SuspendPage(<History />)} />
        </Route>
        <Route path='/admin' element={SuspendPage(<ProtectedAdmin />)}>
          <Route index element={SuspendPage(<Admin />)} />
        </Route>
        <Route path='*' element={SuspendPage(<NotFound />)} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  )
}

export default App;