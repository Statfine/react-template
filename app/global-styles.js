import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  body,
  dl,
  dd,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  form {
    margin: 0;
  }
  ol, li, ul {
    margin: 0;
    padding: 0;
  }
  input,
  button {
    outline: none;
    font-family: 'PingFangSC-Light','Roboto', 'Microsoft YaHei', Arial,  sans-serif !important;
  }
  hr {
    display: none;
  }
  span {
    -webkit-appearance: none !important;
  }
  li {
    list-style:none;
    outline: none;
  }
  input,textarea {
    caret-color: #ff8140;
    font-family: 'PingFangSC-Light','Roboto', 'Microsoft YaHei', Arial,  sans-serif !important;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button{
      -webkit-appearance: none !important;
      margin: 0;
  }
  input[type="number"]{-moz-appearance:textfield;}
`;

export default GlobalStyle;
