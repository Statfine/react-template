/**
 *
 * HostPage
 * 端口检测
 */

import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 24px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  height: 36px;
  border-bottom: 1px solid #e8e8e8;
  &:last-child{
    border-bottom: none;
  }
`;

const ItemIndex = styled.p`
  width: 100px;
`;

const ItemPort = styled.p`
  width: 200px;
`;

const ItemState = styled.p`
  color: ${({ state }) => state === 0 ? '#838383' : state === 1 ? '#4983ED' : '#E6162D'}
`;

/* eslint-disable react/prefer-stateless-function */
export class HostPage extends React.PureComponent {

  state = {
    hostList: [
      {ip: '45.63.57.4', port: '18395', loading: 0},
      {ip: '45.63.57.4', port: '18396', loading: 0},
    ],
  }

  componentDidMount() {
    // this.handleCheckPortByScript('45.63.57.4', '18394');
    // this.handleCheckPortByImage('45.63.57.4', '18396', this.handleCallBack);
    const { hostList } = this.state;
    for (let i = 0; i < hostList.length; i += 1) {
      const host = hostList[i];
      this.handleCheckPortByImage(host.ip, host.port, this.handleCallBack);
    }
  }

  /**
   *  state  状态  close-关闭 open-打开
   */
  handleCallBack = (ip, port, state) => {
    const hostList = [...this.state.hostList]; // eslint-disable-line
    const hostIndex = hostList.findIndex((item) => (item.ip === ip && item.port === port));
    hostList[hostIndex].loading = state === 'open' ? 1 : 2;
    this.setState({ hostList });
  }

  handleCheckPortByScript = (ip, port) => {
    const s = document.createElement("script");
    if (port) s.src = `http://${ip}:${port}`;
    else s.src = `http://${ip}`;
    
    s.onload = () => {
      console.log("[*] IP:%s PORT:%s OPEN!", ip, port);
    }

    s.onError = () => {
      console.log("[*] IP:%s PORT:%s close!", ip, port);
    }
    document.body.appendChild(s);
  }

  handleCheckPortByImage = (ip, port, callback, timeOut = 5000) => {
    const timeout = timeOut ? 0 : timeOut;
    let img = new Image();
    img.onerror = () => {
      if(!img) return;
      img = undefined;
      callback(ip, port, 'open');
    };
    img.onload=img.onerror;
    img.src = `http://${ip}:${port}`;
    setTimeout(() => {
      if(!img) return;
      img = undefined;
      callback(ip, port, 'closed');
    }, timeout)
  };

  render() {
    const { hostList } = this.state;
    return <div>
      <h1>端口检测</h1>
      <Container>
        {hostList.map((item, index) => (
          <Item key={item.port}>
            <ItemIndex>{index + 1}</ItemIndex>
            <ItemPort>{item.ip}:{item.port}</ItemPort>
            <ItemState state={item.loading}>{item.loading === 0 ? '检测' : item.loading === 0 ? '成功' : '失败' }</ItemState>
          </Item>
        ))}
      </Container>
    </div>;
  }
}

HostPage.propTypes = {
};

export default (HostPage);
