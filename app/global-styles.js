/* eslint no-unused-expressions: 0 */
/* eslint no-unused-vars: 0 */
import { injectGlobal } from 'styled-components';
import { DKDropDeadGorgeous } from 'assets/fonts/DKDropDeadGorgeous.ttf';
import { Circular } from 'assets/fonts/CircularStd-Book.ttf';
import { CircularBold } from 'assets/fonts/CircularStd-Bold.ttf';

injectGlobal`
  @font-face {
  	font-family: 'Circular';
  	src: url('../assets/fonts/CircularStd-Book.ttf') format('truetype');
  	font-weight: normal;
  	font-style: normal;
  }

  @font-face {
  	font-family: 'Circular';
  	src: url('../assets/fonts/CircularStd-Bold.ttf') format('truetype');
  	font-weight: bold;
  	font-style: normal;
  }

  @font-face {
  	font-family: 'DKDropDeadGorgeous';
  	src: url('../assets/fonts/DKDropDeadGorgeous.ttf') format('truetype');
  	font-weight: bold;
  	font-style: normal;
  }

  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    margin: 0;
    font-family: 'Circular', sans-serif;
  }

  body.fontLoaded {
    font-family: 'Circular', sans-serif;
  }

  #app {
    min-height: 100%;
    min-width: 100%;
  }
`;
