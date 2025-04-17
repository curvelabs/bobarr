import { gql } from '@apollo/client';
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

// Authentication Result Types
export interface AuthenticateInput {
    password: string;
}

export interface AuthenticateResult {
    success: boolean;
    message: string;
    token: string | null;
}

export interface AuthenticateData {
    authenticate: AuthenticateResult;
}

export interface AuthenticateVariables {
    input: AuthenticateInput;
}

// Logout Types
export interface LogoutData {
    logout: boolean;
}

// Authentication Mutation
const AUTHENTICATE_MUTATION = gql`
  mutation Authenticate($input: AuthenticateInput!) {
    authenticate(input: $input) {
      success
      message
      token
    }
  }
`;

// Logout Mutation
const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

// Custom hooks for authentication
export const useAuthenticateMutation = (options: any = {}) => {
    const [mutate, { loading, error, data }] = useMutation<AuthenticateData, AuthenticateVariables>(
        AUTHENTICATE_MUTATION,
        options
    );

    const authenticate = useCallback(
        ({ variables }: { variables: AuthenticateVariables }) => {
            return mutate({ variables });
        },
        [mutate]
    );

    return { authenticate, loading, error, data };
};

export const useLogoutMutation = (options: any = {}) => {
    const [mutate, { loading, error, data }] = useMutation<LogoutData>(
        LOGOUT_MUTATION,
        options
    );

    const logout = useCallback(() => {
        return mutate();
    }, [mutate]);

    return { logout, loading, error, data };
};