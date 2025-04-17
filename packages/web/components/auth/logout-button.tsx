import React from 'react';
import styled from 'styled-components';
import { useAuth } from './auth-context';

const StyledButton = styled.button`
  background: #ad0303;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 16px;

  &:hover {
    filter: brightness(1.1);
  }
`;

interface LogoutButtonProps {
  className?: string;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ className }) => {
  const { logout } = useAuth();

  return (
    <StyledButton
      className={className}
      onClick={() => {
        logout();
        // Optional: redirect or show a message
      }}
    >
      Logout
    </StyledButton>
  );
};