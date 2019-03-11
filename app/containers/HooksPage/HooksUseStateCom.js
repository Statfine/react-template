/**
 * setData
*/

import React, { useState } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  padding: 24px;
`;

const Flex = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Number = styled.div`
  padding: 0 20px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  border: 1px solid #e8e8e8;
`;

const Btn = styled.div`
  border-radius: 4px;
  background: #4885ed;
  color: #fff;
  text-align: center;
  width: 52px;
  height: 36px;
  line-height: 36px;
  cursor: pointer;
  &:nth-of-type(2n){
    margin: 0 10px;
  }
  &:last-child{
    border-bottom: none;
  }
`;

const defaultData = {
  count: 0,
  name: 'cjg',
  age: 18,
}

/* eslint-disable react/prefer-stateless-function */
export default function HooksUseStateCom({ info }) {
  console.log('info', info, defaultData);
  const [data, setData] = useState(defaultData);
  const [count, setCount] = useState(0);

  /**
   * setData 这里必须将完整的state对象传进去
   */
  return (
    <Container>
      <h2>UseState</h2>
      <Flex>
        <Number>{`name:${data.name}; age:${data.age}; count:${data.count}`}</Number>
        <Btn onClick={() => setData({...data, count: data.count + 1})}>+</Btn> 
        <Btn onClick={() => setData({...data, count: data.count - 1})}>-</Btn> 
      </Flex>
      <Flex>
        <Number>{count}</Number>
        <Btn onClick={() => setCount(prevCount => prevCount + 1)}>+</Btn> 
        <Btn onClick={() => setCount(count - 1)}>-</Btn> 
      </Flex>
    </Container>
  );
}

HooksUseStateCom.propTypes = {
  info: PropTypes.object.isRequired,
};
