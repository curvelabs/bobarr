import React from 'react';
import styled from 'styled-components';

import { SettingsComponentStyles } from './settings.styles';
import { SettingsFormComponent } from './settings-form.component';
import { ActionsComponents } from './actions.component';
import { QualityParamsComponent } from './quality-params.component';
import { TagsComponent } from './tags.component';
import { LogoutButton } from '../auth/logout-button';

const LogoutContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 0 24px 24px 0;
`;

export function SettingsComponent() {
  return (
    <SettingsComponentStyles>
      <LogoutContainer>
        <LogoutButton />
      </LogoutContainer>
      <div className="wrapper">
        <div className="flex">
          <div className="row">
            <ActionsComponents />
            <QualityParamsComponent />
          </div>
          <div className="row">
            <TagsComponent />
            <SettingsFormComponent />
          </div>
        </div>
      </div>
    </SettingsComponentStyles>
  );
}
