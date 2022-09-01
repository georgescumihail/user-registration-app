import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Details from './pages/Details';
import SignUp from './pages/SignUp';
import { useEffect } from 'react';

function App() {

  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='login' replace />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/details' element={<Details />} />
          <Route path='*' element={<Navigate to='login' replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
