import styled from 'styled-components';

export const SettingsComponentStyles = styled.div`
  padding-top: 48px;

  .wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
  }

  .flex {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 24px;
  }

  .row {
    width: calc(50% - 12px);
    max-width: 500px;
  }

  .actions {
    .ant-card {
      margin-bottom: 24px;
    }

    .ant-btn {
      display: block;
      margin-bottom: 12px;
      width: 100%;
    }
  }

  .quality-preference {
    margin-top: 24px;

    .ant-card-head-title {
      display: flex;

      .help {
        cursor: pointer;
        margin-left: auto;
      }
    }

    .ant-btn {
      margin-bottom: 8px;
      width: 100%;
    }

    .save-btn {
      margin-top: 16px;
    }
  }

  .tags-container {
    margin-top: 24px;

    .ant-tag {
      margin-bottom: 8px;
      font-size: 14px;
      padding: 4px 8px;
    }
  }

  /* Mobile responsive styles */
  @media (max-width: 992px) {
    .row {
      width: 100%;
      max-width: 100%;
    }
  }

  @media (max-width: 768px) {
    padding-top: 32px;

    .ant-card-body {
      padding: 16px;
    }

    .ant-form-item {
      margin-bottom: 16px;
    }
  }
`;
