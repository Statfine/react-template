import React from 'react';
import { Spin } from 'antd';
import Wrapper from './Wrapper';

const LoadingIndicator = () => (
  <Wrapper>
    <Spin size="large" />
  </Wrapper>
);

export default LoadingIndicator;
