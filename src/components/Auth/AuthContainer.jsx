import React, { useState } from 'react';

// Static Mock User Data
const MOCK_USER = {
  email: "user@example.com",
  password: "password123",
  name: "Test User"
};

const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Mock Login Validation
      if (formData.email === MOCK_USER.email && formData.password === MOCK_USER.password) {
        setCurrentUser({ name: MOCK_USER.name, email: MOCK_USER.email });
      } else {
        setError('Invalid credentials! Try: user@example.com / password123');
      }
    } else {
      // Mock Sign Up Validation
      if (!formData.name || !formData.email || !formData.password) {
        setError('Please fill in all fields.');
        return;
      }
      setCurrentUser({ name: formData.name, email: formData.email });
    }
  };

  if (currentUser) {
    return (
      <div className="auth-card">
        <h3>Welcome, {currentUser.name}!</h3>
        <p>Logged in as: {currentUser.email}</p>
        <button onClick={() => setCurrentUser(null)}>Logout</button>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>

      <p style={{ cursor: 'pointer', color: 'blue' }} onClick={() => { setIsLogin(!isLogin); setError(''); }}>
        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
      </p>
    </div>
  );
};

export default AuthContainer;