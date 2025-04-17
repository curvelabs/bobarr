import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from './auth-context';
import { useAuthenticateMutation } from '../../utils/auth-types';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  padding: 2rem;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  margin-top: 100px;
`;

const Title = styled.h2`
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.coral};
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.coral};
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.colors.navbarBackground};
  color: #011021;

  &:focus {
    border-color: ${({ theme }) => theme.colors.blue};
    outline: none;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.colors.coral};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: ;
  }

  &:disabled {
    background:rgb(82, 82, 82);
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color:rgb(199, 7, 1);
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const InfoMessage = styled.p`
  color: #058a57;
  margin-top: 1rem;
  font-size: 0.9rem;
  text-align: center;
`;

export const LoginComponent: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const { authenticate, loading } = useAuthenticateMutation({
    onCompleted: (data: any) => {
      if (data.authenticate.success && data.authenticate.token) {
        login(data.authenticate.token);
      } else {
        setError(data.authenticate.message || 'Authentication failed');
      }
    },
    onError: (error: any) => {
      setError(error.message);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    authenticate({
      variables: {
        input: {
          password
        }
      }
    });
  };

  return (
    <LoginContainer>
      <Title>Settings Access</Title>
      <Form onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Authenticating...' : 'Access Settings'}
        </Button>
      </Form>
      <InfoMessage>
        Enter your admin password to access settings.
        <br />
        For first time login, use your TMDB API key.
      </InfoMessage>
    </LoginContainer>
  );
};