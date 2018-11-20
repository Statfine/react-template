/**
 *
 * Dashboard
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Header from 'components/Header';
import { Menu, Icon, Layout } from 'antd';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const AppWrapper = styled(Layout)`
  height: 100%;
  width: 100%;
  padding-top: 50px;
`;

const RightNav = styled(Layout)`
  padding: 24px;
`;

const LeftNav = styled(Sider)`
  width: 200;
  background: #fff;
  box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.12);
  z-index: 500;
  color: #4885ed;
  display: flex;
  flex-direction: column;
  align-content: space-around;
  margin-bottom: -20px;
  overflow-y: auto;
`;
const Wrapper = styled(Content)`
  background: #fff;
  padding: 24;
  margin: 0;
  min-height: 280px;
`;

/* eslint-disable react/prefer-stateless-function */
export class DevelopDoc extends React.PureComponent {

  state = {
    selectedKeys: ['import'],
  }

  handleClickTitle = (item) => {
    this.setState({ selectedKeys: item.keyPath });
  }

  render() {
    const { selectedKeys } = this.state;
    return (
      <AppWrapper>
        <Helmet>
          <title>开发者文档</title>
        </Helmet>
        <Header />
        <Layout>
          <LeftNav>
            <Menu
              style={{ width: 240 }}
              defaultSelectedKeys={selectedKeys}
              openKeys={['sub']}
              mode="inline"
            >
              <SubMenu key="sub" title={<div style={{ display: 'flex', alignItems: 'center' }}><Icon type="setting" /><span>相关文档</span></div>}>
                <Menu.Item key="import" onClick={this.handleClickTitle}>import</Menu.Item>
                <Menu.Item key="export" onClick={this.handleClickTitle}>export</Menu.Item>
                <Menu.Item key="cut" onClick={this.handleClickTitle}>cut</Menu.Item>
              </SubMenu>
            </Menu>
          </LeftNav>
          <RightNav>
            <Wrapper>
              {selectedKeys}
            </Wrapper>
          </RightNav>
        </Layout>
      </AppWrapper>
    );
  }
}

DevelopDoc.propTypes = {
  // match: PropTypes.object,
  // history: PropTypes.object,
};

export default (DevelopDoc);
