import styled from 'styled-components';
import { Layout } from 'antd';
const { Header } = Layout;

export const HeaderContainer = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  line-height: 1;
  font-size: 18px;
  padding: 0 25px;
  clear: both;
  background-color: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.12);
`;

export const Part = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  &:after {
    content: '';
    width:1px;
    height:14px;
    background: #e9e9e9;
    position:absolute;
    left:0px;
    top:23px;
  }
`;

export const JumpP = styled.p`
  cursor: pointer;
  font-size: 14px;
  color: rgba(0,0,0,0.65);
  // &:hover {
  //   color: #108EE9;
  // }
  // &:after {
  //   content: '';
  //   width:1px;
  //   height:14px;
  //   background: #e9e9e9;
  //   position:absolute;
  //   left:0px;
  //   top:23px;
  // }
`;

export const Title = styled.p`
  margin-right: 20px;
  font-size: 14px;
  color: rgba(0,0,0,0.65);
  line-height: 21px;
`;
