import Head from 'next/head';
import React from 'react';

import { withApollo } from '../components/with-apollo';
import { LayoutComponent } from '../components/layout/layout.component';
import { SettingsComponent } from '../components/settings/settings.component';
import { AuthProvider } from '../components/auth/auth-context';
import { ProtectedRoute } from '../components/auth/protected-route';

function SettingsPage() {
  return (
    <>
      <Head>
        <title>Bobarr - Settings</title>
      </Head>
      <LayoutComponent>
        <AuthProvider>
          <ProtectedRoute>
            <SettingsComponent />
          </ProtectedRoute>
        </AuthProvider>
      </LayoutComponent>
    </>
  );
}

export default withApollo(SettingsPage);
