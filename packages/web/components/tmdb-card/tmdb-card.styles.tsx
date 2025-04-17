import styled from 'styled-components';

export const TMDBCardStyles = styled.div`
  flex-shrink: 0;
  position: relative;
  width: 220px;
  margin: 0 auto;
  max-width: 100%;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .poster--container {
    border-radius: 12px;
    cursor: pointer;
    height: 330px;
    position: relative;
    overflow: hidden;
    width: 220px;
    max-width: 100%;
    margin: 0 auto;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

    .poster,
    .overlay {
      height: 330px;
      width: 100%;
      left: 0;
      top: 0;
      position: absolute;
    }

    .poster {
      background: #004e89;
      background-size: cover !important;
      background-position: center !important;
    }

    .overlay {
      display: flex;
      background: rgba(0, 0, 0, 0.7);
      align-items: center;
      justify-content: center;
      flex-direction: column;
      transition: opacity 0.2s ease;
      opacity: 0;

      &:hover {
        opacity: 1;
      }

      @media (max-width: 768px) {
        &:active {
          opacity: 1;
        }
      }

      .anticon {
        color: #fff;
        font-size: 2em;
      }
    }

    .action-label {
      color: #fff;
      font-size: 1em;
      text-transform: uppercase;
      font-weight: 900;
      font-family: monospace;
      margin-top: 10px;
      text-align: center;
      padding: 0 10px;
    }

    .media-type-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 0.8em;
      text-transform: uppercase;
      z-index: 1;
    }
  }

  .name {
    font-weight: 700;
    margin: 10px 0 2px;
    text-align: center;
    padding: 0 10px;
    word-wrap: break-word;
    color: #333;
    font-size: 1.1em;
  }

  .date {
    text-transform: lowercase;
    font-size: 0.8em;
    font-weight: 300;
    color: #777;
    text-align: center;
    padding: 0 10px;
  }

  .vote--container {
    position: absolute;
    bottom: -18px;
    left: 10px;
    z-index: 2;
    background: white;
    border-radius: 50%;
    padding: 2px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 480px) {
    width: 170px;

    .poster--container {
      height: 255px;
      width: 170px;

      .poster, .overlay {
        height: 255px;
      }

      .media-type-badge {
        font-size: 0.7em;
        padding: 2px 6px;
      }
    }

    .name {
      font-size: 1em;
    }

    .vote--container {
      bottom: -15px;
      left: 5px;
    }
  }
`;
