import React, { useState } from 'react';
import { Input, Button, Form, Alert, message } from 'antd';
import styled from 'styled-components';
import { LockOutlined } from '@ant-design/icons';

import { useAuthenticateMutation } from '../../utils/graphql';

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: white;

  h1 {
    text-align: center;
    margin-bottom: 24px;
    color: #3a6ea5;
  }

  .login-form-button {
    width: 100%;
    margin-top: 16px;
  }
`;

interface SettingsLoginProps {
  onLoginSuccess: (token: string) => void;
}

export function SettingsLoginComponent({ onLoginSuccess }: SettingsLoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [authenticate, { loading }] = useAuthenticateMutation();

  const handleSubmit = async () => {
    try {
      setError(null);
      const result = await authenticate({
        variables: {
          input: { password }
        }
      });

      if (result.data?.authenticate.success) {
        const token = result.data.authenticate.token || '';
        // Store token
        localStorage.setItem('authToken', token);
        // If there's a message, show it
        if (result.data.authenticate.message) {
          message.info(result.data.authenticate.message);
        }
        onLoginSuccess(token);
      } else {
        setError(result.data?.authenticate.message || 'Authentication failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Authentication error. Please try again.');
    }
  };

  return (
    <LoginContainer>
      <h1>Settings Access</h1>
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="login-form-button"
            size="large"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </LoginContainer>
  );
}