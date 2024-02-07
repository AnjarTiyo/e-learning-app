import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../api/baseUrl';

const AdminPage = ({ onLogout }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(token)
        const res = await fetch(`${BASE_URL}/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (res.ok) {
          const { name } = await res.json();
          setUserName(name);
        } else {
          console.error('Error fetching user profile:', res.status);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div>
      <h1>Welcome to Admin Page, {userName}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminPage;
