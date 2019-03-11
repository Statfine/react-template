/**
 * Context
*/

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import ThemeContext from './ThemeContext';

const Container = styled.div`
  padding: 24px;
`;

export default function HooksContextCom() {

  return (
    <Container>
      <h2>Context</h2>
      <ThemeContext.Consumer>
        {context => (
          <h1 style={{background: context.background, color: context.color}}>
            123
          </h1>
        )}
      </ThemeContext.Consumer>
    </Container>
  );
}
