/**
 * useEffect
 * useRef
*/

import React, { useState, useEffect, useRef } from 'react';
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

export default function HooksUseEffectCom({userId}) {
  const intervalRef = useRef()
  const [count, setCount] = useState(0);
  
  /**
   * 类似componentDidMount 和 componentDidUpdate:
   * 第二个参数不填 会等效componentDidUpdate触发
   * 
   */
  useEffect(() => {
    const _setCount = setCount;
    let _count = count;
    const timeInterval = setInterval(() => {
      _count += 1;
      _setCount(_count);
    }, 2000);
    return () => clearInterval(timeInterval);
  }, [])

  useEffect(() => {
    const timeInterval = setInterval(() => console.log('timeInterval'), 2000);
    intervalRef.current = timeInterval;
    return () => clearInterval(intervalRef.current);
  }, [])

  useEffect(() => console.log('userId', userId), [userId])

  return (
    <Container>
      <h2>useEffect</h2>
      <Flex>
        <Number>{count}</Number>
      </Flex>
    </Container>
  );
}

HooksUseEffectCom.propTypes = {
  userId: PropTypes.number,
};
