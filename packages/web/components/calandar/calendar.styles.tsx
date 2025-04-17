import styled from 'styled-components';

export const CalendarStyles = styled.div`
  .wrapper {
    padding-top: 60px;
    max-width: 1200px;
    margin: 0 auto;
    padding-left: 16px;
    padding-right: 16px;
  }

  .cell-title {
    font-weight: 600;
  }

  /* Fix for calendar elements appearing above the mobile menu */
  .ant-picker-calendar,
  .ant-picker-panel,
  .ant-picker-date-panel,
  .ant-fullcalendar,
  .ant-alert,
  .ant-skeleton {
    position: relative;
    z-index: 1;
  }

  /* Responsive styles for calendar */
  @media (max-width: 768px) {
    .ant-picker-calendar-full .ant-picker-panel .ant-picker-calendar-date-content {
      height: auto;
      min-height: 40px;
    }

    .ant-tag {
      margin-bottom: 4px;
    }
  }
`;
