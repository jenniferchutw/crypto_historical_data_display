import styled, { css } from 'styled-components';
import variables from '../abstracts/Variables';
import { device } from '../abstracts/MediaQueries';

export const body = css`
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: ${variables.defaultFontSize};
  line-height: 1.7;

  @media ${device.laptop} {
    font-size: 1.2rem;
  }

  @media ${device.mobileXL} {
    font-size: 1rem;
  }
`;

export const h1 = styled.h1`
  text-transform: uppercase;
  display: block;
  padding: 2rem;
  font-size: 8rem;
  font-weight: 700;
  letter-spacing: 1rem;
  cursor: default;

  @media ${device.laptop} {
    font-size: 6rem;
  }

  @media ${device.mobileXL} {
    font-size: 4rem;
  }
`;

export const h2 = styled.h2`
  padding: 2rem;
  font-size: 4rem;
  font-weight: 700;
  letter-spacing: 0.1rem;
  cursor: default;

  @media ${device.laptop} {
    font-size: 3.5rem;
  }

  @media ${device.mobileXL} {
    font-size: 2.5rem;
  }
`;

export const h3 = styled.h3`
  display: block;
  padding: 2rem;
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: 0.1rem;
  cursor: default;

  @media ${device.laptop} {
    font-size: 2.5rem;
    padding: 1.5rem;
  }

  @media ${device.mobileXL} {
    font-size: 2rem;
    padding: 1rem;
  }
`;
