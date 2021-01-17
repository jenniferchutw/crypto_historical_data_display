import { createGlobalStyle } from 'styled-components';
import { body as bodyTypo } from './Typography';

export const GlobalStyle = createGlobalStyle`
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 62.5%;
  /* This defines what 1 rem is
  10px(font size you want) / 16px(default font size) = 62.5 
  10px = 1rem */


  @media (max-width: 75em) {
    font-size: 56.25%;
  }

  @media (max-width: 56.25em) {
    font-size: 50%;
  }

  @media (min-width: 112.5em) {
    font-size: 75%;
  }
}

body {
  box-sizing: border-box;
  padding: 3rem;

  ${bodyTypo}

  @media (max-width: 56.25em) {
    padding: 0;
  }

}
`;
