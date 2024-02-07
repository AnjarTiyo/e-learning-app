import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import AdminPage from './components/Admin/AdminPage';
import UserPage from './components/User/UserPage';
import NotFoundPage from './components/NotFoundPage';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    setLoggedIn(false); // Update loggedIn state to false
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? (
                <Navigate to={loggedIn.role === 'admin' ? '/admin' : '/user'} replace />
              ) : (
                <LoginPage onLogin={(role) => setLoggedIn({ role })} />
              )
            }
          />
          <Route
            path="/admin"
            element={
              loggedIn && loggedIn.role === 'admin' ? (
                <AdminPage onLogout={handleLogout} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/user"
            element={
              loggedIn && loggedIn.role === 'user' ? (
                <UserPage onLogout={handleLogout} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
