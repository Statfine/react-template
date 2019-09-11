import React, { useState, useCallback, useEffect } from 'react';

import styled from 'styled-components';

const Container = styled.div`
  padding: 24px;
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

const Input = styled.input`
  border-radius: 4px;
  border: 1px solid #4885ed;
  color: #000;
  width: 520px;
  height: 36px;
  line-height: 36px;
`;

// eslint-disable-next-line react/prop-types
function Child({ callback }) {
  const [count, setCount] = useState(() => callback());
  useEffect(() => {
    console.log('Child callback');
    setCount(callback());
  }, [callback]);
  return <div>
    {count}
  </div>
}

const set = new Set();
export default function HooksUseCallbackCom() {
  const [count, setCount] = useState(1);
  const [val, setVal] = useState('');

  const callback = useCallback(() => {
    console.log('callback');
    return count;
  }, [count]);
  set.add(callback);

  return(
    <Container>
      <h2>HooksUseCallbackCom 查看console</h2>
      <h4>{count}</h4>
      <h4>{set.size}</h4>
      <Child callback={callback}/>
      <Btn onClick={() => setCount(count + 1)}>+</Btn>
      <Input value={val} onChange={event => setVal(event.target.value)}/>
    </Container>
  )
}