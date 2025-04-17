import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
`;

export const UnifiedResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
  padding: 10px 0;

  .result-item {
    display: flex;
    justify-content: center;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
    gap: 16px;
  }
`;

export const SearchStyles = styled.div`
  .search-bar {
    &--input {
      border: none;
      border-radius: 20px;
      color: #222;
      font-size: 1.2em;
      outline: none;
      padding: 8px 18px;
      height: 48px;
      width: 100%;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

      &::placeholder {
        color: #888;
      }

      &-container {
        position: relative;
      }

      &-submit {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #3a6ea5;
        border: none;
        border-radius: 50%;
        color: #fff;
        cursor: pointer;
        font-size: 1.4em;
        height: 40px;
        width: 40px;
        position: absolute;
        right: 4px;
        top: 4px;
        transition: background-color 0.2s ease;

        &:hover {
          background: #1e4976;
        }
      }
    }

    &--container {
      background-color: #004e89;
      background-image: linear-gradient(45deg, #004e89, #1a659e);
      padding: 40px 16px;
    }

    &--title {
      color: #fff;
      font-size: 2em;
      font-weight: 600;
      margin-bottom: 5px;
    }

    &--subtitle {
      color: #fff;
      font-size: 1.6em;
      font-weight: 500;
      margin-bottom: 32px;
      opacity: 0.9;
    }
  }

  .search-results {
    &--container {
      margin-top: 32px;
    }

    &--category {
      font-weight: 500;
      font-size: 1.5em;
      margin-bottom: 16px;
      color: #333;
      border-left: 4px solid #3a6ea5;
      padding-left: 12px;
    }

    &--row {
      display: flex;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: thin;

      &::-webkit-scrollbar {
        height: 6px;
      }

      &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 10px;
      }
    }
  }

  .loading-more {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px 0;
    color: #555;

    span {
      margin-left: 10px;
    }
  }

  .results-end-marker {
    height: 20px;
  }

  @media (max-width: 768px) {
    .search-bar {
      &--title {
        font-size: 1.6em;
      }

      &--subtitle {
        font-size: 1.2em;
        margin-bottom: 24px;
      }

      &--input {
        height: 40px;
        font-size: 1em;

        &-submit {
          height: 34px;
          width: 34px;
          font-size: 1.2em;
          right: 3px;
          top: 3px;
        }
      }
    }

    .search-results {
      &--category {
        margin-left: 0;
        font-size: 1.3em;
      }
    }
  }
`;
