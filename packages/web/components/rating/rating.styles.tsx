import styled from 'styled-components';

interface Props {
  rating: number;
}

export const RatingStyles = styled.div<Props>`
  color: #fff;
  font-size: 11px;
  position: relative;
  width: 38px;
  height: 38px;
  transition: transform 0.2s ease;

  .vote {
    border: 2px solid ${({ theme }) => theme.colors.navbarBackground};
    background: ${(props) => {
      if (props.rating >= 75) return '#21d07a';
      if (props.rating >= 50) return '#d2d531';
      return '#db2360';
    }};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 100%;
    width: 100%;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);

    &::before {
      content: ' ';
      background: ${({ theme }) => theme.colors.navbarBackground};
      border-radius: 50%;
      position: absolute;
      top: 2px;
      left: 2px;
      height: calc(100% - 4px);
      width: calc(100% - 4px);
    }
  }

  .percent {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    font-size: 10px;
  }
`;
