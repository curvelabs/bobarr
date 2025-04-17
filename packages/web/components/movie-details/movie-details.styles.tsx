import styled from 'styled-components';

export const MovieDetailsStyles = styled.div`
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  max-height: 85vh;
  position: relative;
  animation: modalFadeIn 0.3s ease-in-out;
  border-radius: 8px;
  overflow: hidden;

  @keyframes modalFadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  ::-webkit-scrollbar {
    width: 6px;
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }

  .close-icon {
    position: absolute;
    color: #fff;
    cursor: pointer;
    top: 12px;
    right: 12px;
    z-index: 999;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    svg {
      font-size: 1.4em;
      filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.8));
    }

    &:hover {
      transform: scale(1.1);
    }
  }

  .btn {
    display: inline-flex;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 4px;
    cursor: pointer;
    color: #fff;
    padding: 8px 14px;
    transition: all 0.2s ease;
    margin-right: 12px;
    margin-bottom: 8px;

    &:hover {
      border-color: #fff;
      background: rgba(255, 255, 255, 0.1);
    }

    &.btn-success {
      background: rgba(76, 175, 80, 0.7);
      border-color: rgba(76, 175, 80, 0.3);

      &:hover {
        background: rgba(76, 175, 80, 0.9);
      }
    }

    &.btn-danger {
      background: rgba(244, 67, 54, 0.7);
      border-color: rgba(244, 67, 54, 0.3);

      &:hover {
        background: rgba(244, 67, 54, 0.9);
      }
    }

    svg {
      margin-right: 8px;
    }

    &.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  .header-container {
    position: relative;
    height: 100%;
    width: 100%;
  }

  .header-background {
    position: absolute;
    top: 0;
    left: 0;
    background-size: cover;
    background-position: center;
    height: 100%;
    width: 100%;
    z-index: 1;
  }

  .header-background-overlay {
    background-image: linear-gradient(
      to right,
      rgba(12.94%, 14.9%, 22.75%, 1) 150px,
      rgba(20.39%, 22.35%, 29.02%, 0.84) 100%
    );
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
  }

  .header-content {
    display: flex;
    padding: 30px 36px;
    width: 100%;
    position: relative;
    z-index: 3;
  }

  .poster-container {
    height: 100%;
    width: 200px;
    flex-shrink: 0;

    .poster-wrapper {
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
    }

    .poster-image {
      border-radius: 8px;
      height: auto;
      width: 200px;
      max-width: 100%;
      display: block;
    }
  }

  .movie-details {
    flex: 1;
    margin-left: 36px;
    color: #fff;
  }

  .title {
    display: flex;
    align-items: center;
    font-size: 2.2em;
    font-weight: 700;
    flex-wrap: wrap;

    .year {
      font-size: 0.8em;
      font-weight: 300;
      margin-left: 10px;
      opacity: 0.8;
    }
  }

  .play-trailer {
    display: inline-flex;
    align-items: center;
    margin: 16px 0;
    text-decoration: none !important;

    svg {
      margin-right: 8px;
    }
  }

  .informations-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: 12px 0;

    .vote--container {
      margin-right: 24px;
      margin-bottom: 8px;
    }
  }

  .overview {
    font-size: 1.2em;
    max-width: 780px;
    line-height: 1.6;
    margin: 16px 0;
  }

  .buttons {
    margin-top: 24px;
    display: flex;
    flex-wrap: wrap;
  }

  .file-details {
    margin-top: 24px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    padding: 10px 15px;

    li {
      margin-bottom: 5px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 570px;
    }

    strong {
      font-weight: bold;
      opacity: 0.8;
    }

    em {
      margin-left: 8px;
      font-family: monospace;
    }
  }

  @media (max-width: 768px) {
    max-height: 85vh;

    .header-content {
      flex-direction: column;
      padding: 20px 16px;
    }

    .poster-container {
      width: 160px;
      margin: 0 auto 20px;

      .poster-image {
        width: 160px;
      }
    }

    .movie-details {
      margin-left: 0;
    }

    .title {
      font-size: 1.6em;
      text-align: center;
      justify-content: center;
    }

    .overview {
      font-size: 1em;
      text-align: justify;
    }

    .buttons {
      justify-content: center;
    }

    .informations-row {
      justify-content: center;
    }

    .play-trailer {
      margin-left: auto;
      margin-right: auto;
    }

    .file-details {
      li {
        max-width: 100%;
      }
    }
  }
`;
