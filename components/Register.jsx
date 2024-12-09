import { useState } from 'react';
import api from '../src/api';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    bio: '',
    role: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', formData);
      alert('Registration successful');
      // Optionally, clear the form after successful submission
      setFormData({ username: '', email: '', password: '', name: '', bio: '', role: 'student' });
      setError('');
    } catch (error) {
      setError('Registration failed');
      console.error('Registration failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
  <div className="form-group"> 
    <label htmlFor="username" className="form-label">Username:</label>
    <input type="text" id="username" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="input-field" required />
  </div>
  
  <div className="form-group">
    <label htmlFor="email" className="form-label">Email:</label>
    <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="input-field" required />
  </div>
  
  <div className="form-group">
    <label htmlFor="password" className="form-label">Password:</label>
    <input type="password" id="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="input-field" required />
  </div>
  
  <div className="form-group">
    <label htmlFor="name" className="form-label">Name:</label>
    <input type="text" id="name" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="input-field" required />
  </div>
  
  <div className="form-group">
    <label htmlFor="bio" className="form-label">Bio:</label>
    <textarea id="bio" name="bio" placeholder="Bio" value={formData.bio} onChange={handleChange} className="input-field textarea-field" required></textarea>
  </div>
  
  {/* <div className="form-group">
    <label htmlFor="role" className="form-label">Role:</label>
    <input type="text" id="role" name="role" placeholder="Role" value={formData.role} onChange={handleChange} className="input-field" required />
  </div> */}

  <div className="form-group" >
    <label htmlFor="role" className="form-label">Role:</label>
    <select name="role" id="role" value={formData.role} onChange={handleChange} className="input-field" required>
      <option value="">Select Role</option>
      <option value="student">Student</option>
      <option value="instructor">Instructor</option>
    </select>
  </div>
  
  {error && <div className="error-message">{error}</div>}
  
  <button type="submit" className="submit-button">Register</button>
</form>
  );
}

export default Register;
