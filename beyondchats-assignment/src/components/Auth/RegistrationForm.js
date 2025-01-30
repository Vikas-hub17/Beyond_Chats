import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContainer, Input, Title } from './AuthStyles';
import GoogleButton from '../Shared/GoogleButton';
import Button from '../Shared/Button';

const RegistrationForm = ({ onVerify }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onVerify();
    navigate('/setup');
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>Create Account</Title>
      <Input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <Input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <Button type="submit" fullWidth>Sign Up</Button>
      <GoogleButton onClick={() => console.log('Google sign-in')} />
    </FormContainer>
  );
};

export default RegistrationForm;