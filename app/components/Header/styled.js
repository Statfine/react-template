import styled from 'styled-components';
import { Layout } from 'antd';
const { Header } = Layout;

export const HeaderContainer = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  line-height: 1;
  font-size: 18px;
  padding: 0 25px;
  position: fixed;
  top: 0;
  z-index: 1000;
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

export const LogoImg = styled.img`
  height: 32px;
  width: auto;
`;

export const JumpP = styled.p`
  margin-top: 6px;
  cursor: pointer;
  margin-left: 20px;
  &:hover {
    color: #ff8140;
  }
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

export const ImgP = styled(JumpP)`
  border-left: 2px #DDD dashed;
  padding-left: 20px;
  margin-left: 20px;
`;

export const Title = styled.p`
  font-size: 14px;
  color: #9e9e9e;
  margin-left: 4px;
`;
