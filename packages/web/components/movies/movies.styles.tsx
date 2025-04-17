import styled from 'styled-components';

export const MoviesComponentStyles = styled.div`
  padding-top: 32px;

  .wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
  }

  .flex {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-left: -12px;
    margin-right: -12px;
  }

  .movie-card,
  .tvshow-card {
    margin-left: 12px;
    margin-right: 12px;
    margin-bottom: 24px;
    height: ${({ theme }) => theme.tmdbCardHeight}px;
  }

  .sortable {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 24px;
    justify-content: space-between;

    .sort-buttons button {
      margin-right: 8px;
      margin-bottom: 8px;
    }

    .search-input {
      margin-left: auto;
      width: 300px;
      max-width: 100%;
    }
  }

  @media (max-width: 768px) {
    .sortable {
      flex-direction: column;

      .sort-buttons {
        margin-bottom: 16px;
        display: flex;
        flex-wrap: wrap;
      }

      .search-input {
        margin-left: 0;
        width: 100%;
      }
    }
  }

  @media (max-width: 480px) {
    .movie-card,
    .tvshow-card {
      height: 255px;
    }
  }
`;
