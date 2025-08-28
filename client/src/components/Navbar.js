import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ userRole, userName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>Mentor Path AI</h2>
      </div>
      
      <div className="navbar-menu">
        {userRole && (
          <div className="nav-items">
            <span className="welcome-text">Welcome, {userName || 'User'} ({userRole})</span>
            
            <button 
              className="nav-link" 
              onClick={() => navigate(`/${userRole}`)}
            >
              Dashboard
            </button>
            
            <button 
              className="nav-link" 
              onClick={() => navigate('/profile')}
            >
              Profile
            </button>
            
            <button 
              className="nav-link logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
