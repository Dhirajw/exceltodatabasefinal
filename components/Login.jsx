import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import api, { setAuthToken } from '../src/api';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', formData);
      const token = response.data.token;
      localStorage.setItem('token', token);
      setAuthToken(token);
      navigate('/courses');
      alert('Login successful');
      setError('');
      
    } catch (error) {
      setError('iNVALID CREDINTIAL');
      console.error('Login failed', error);
    }
  };

  return (
    <>
      <h1>Login here</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="input-field" required />
        </div>
        
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password:</label>
          <input type="password" id="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="input-field" required />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
