import styled from 'styled-components';
import { MovieDetailsStyles } from '../movie-details/movie-details.styles';

export const TVShowSeasonsModalComponentStyles = styled(MovieDetailsStyles)`
  .seasons-container {
    margin-top: 24px;
  }

  .seasons-title {
    font-size: 1.4em;
    margin-bottom: 16px;
    color: #fff;
    opacity: 0.9;
  }

  .seasons {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 10px;
  }

  .season-row {
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    padding: 10px 12px;
    transition: all 0.2s ease;
    width: calc(33.333% - 10px);
    min-width: 160px;

    &.selected {
      border-color: #fff;
      background: rgba(255, 255, 255, 0.1);
    }

    &.in-library {
      border-color: rgba(76, 175, 80, 0.7);
      background: rgba(76, 175, 80, 0.1);
      cursor: default;
    }

    &:hover:not(.in-library) {
      transform: translateY(-3px);
      border-color: #fff;
      background: rgba(255, 255, 255, 0.07);
    }
  }

  .season-number {
    font-size: 1.1em;
    font-weight: 600;
  }

  .season-episodes-count {
    font-size: 0.9em;
    opacity: 0.8;
  }

  .seasons-details {
    padding-top: 24px;

    .season-top {
      margin-bottom: 8px;
      display: flex;
      align-items: center;
    }

    .season-title {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .season-replace {
      font-weight: bold;
      display: flex;
      align-items: center;
      margin-left: 32px;
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 5px;
      padding: 4px 8px;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }

    .season-number {
      font-size: 1.25em;
      font-weight: 600;
      margin-right: 12px;
    }

    .season-year {
      font-size: 1em;
      font-weight: 300;
    }

    .season-toggle {
      margin-right: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
    }
  }

  .action-buttons {
    margin-top: 24px;
    display: flex;
    flex-wrap: wrap;
  }

  @media (max-width: 992px) {
    .season-row {
      width: calc(50% - 10px);
    }
  }

  @media (max-width: 768px) {
    .season-row {
      width: 100%;
      margin: 0;
    }
  }
`;
