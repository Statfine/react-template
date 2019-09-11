import React, { useState, useMemo } from 'react';
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

export default function HooksMemoCom () {

  const [count, setCount] = useState(1);
  const [val, setVal] = useState('');

  const expensive = () => {
    console.log('expensive');
    return 'expensive';
  }

  // count 改变才会触发
  const expensiveUseMemo = useMemo(() => {
    console.log('expensiveUseMemo');
    return 'expensiveUseMemo';
  }, [count])

  // 初次执行
  const expensiveUseMemoTwo = useMemo(() => {
    console.log('expensiveUseMemoTwo');
    return 'expensiveUseMemoTwo';
  }, [])

  return (
    <Container>
      <h2>HooksMeno 查看console</h2>
      <p>计算方法:{expensive()}</p>
      <p>计算方法UseMemo:{expensiveUseMemo}</p>
      <p>计算方法UseMemoTwo:{expensiveUseMemoTwo}</p>
      <p>count:{count}</p>
      <Btn onClick={() => setCount(count + 1)}>修改count</Btn>
      <Input value={val} onChange={event => setVal(event.target.value)}/>
    </Container>
  );
}