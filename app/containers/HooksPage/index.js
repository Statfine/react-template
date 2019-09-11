/**
 *
 * HooksPage
 * https://www.jianshu.com/p/6c43b440dab8#usestate
 *
 */

import React from 'react';
import styled from 'styled-components';
import HooksUseStateCom from './HooksUseStateCom';
import HooksUseEffectCom from './HooksUseEffectCom';
import HooksContextCom from './HooksContextCom';
import HooksMemoCom from './HooksMemoCom';
import HooksUseCallbackCom from './HooksUseCallbackCom';

import ThemeContext from './ThemeContext';

const PageSelect = styled.div`
  display: flex;
`;

const PageSelectItem = styled.p`
  height: 24px;
  line-height: 22px;
  width: 100px;
  border: 1px solid #000;
  text-align: center;
  cursor: pointer;
  background: ${({ choosed }) => choosed ? "#4885ed" : "#fff"}
`;

/* eslint-disable react/prefer-stateless-function */
const PAGE_LIST = [
  { key: 0, name: 'useState' },
  { key: 1, name: 'useEffect' },
  { key: 2, name: 'context' },
  { key: 3, name: 'Memo' },
  { key: 4, name: 'callback' },
]
export class HooksPage extends React.PureComponent {
  state = {
    show: 1,
    userId: 1,
    hooksIndex: 0, // 0-useState 1-useEffect 2-context
  }

  renderUseEffect = (show, userId) =>(
    <div>
      { show === 1 && <div onClick={() => this.setState({ userId: this.state.userId + 1 })}>change</div>}
      { show === 1 && <HooksUseEffectCom userId={userId} />}
    </div>
  )

  renderContext = () => (
    <ThemeContext.Provider value={{background: 'green', color: 'white'}}>
      <HooksContextCom />
    </ThemeContext.Provider>
  )

  renderContent = () => {
    const { hooksIndex, show, userId } = this.state;
    switch (hooksIndex) {
      case 0:
        return (<HooksUseStateCom info={{ name: 1 }} />);
      case 1:
        return (this.renderUseEffect(show, userId));
      case 2:
        return (this.renderContext());
      case 3:
        return (<HooksMemoCom />);
      case 4:
        return (<HooksUseCallbackCom />);
      default:
        return null;  
    }
  }

  render() {
    const { hooksIndex } = this.state;
    return (
      <div>
        <h1>HooksPage</h1>
        <PageSelect>
          {
            PAGE_LIST.map((item) => (
              <PageSelectItem
                key={item.key}
                choosed={hooksIndex === item.key}
                onClick={() => this.setState({ hooksIndex: item.key })}
              >
                {item.name}
              </PageSelectItem>
            ))
          }
        </PageSelect>
        {this.renderContent()}
      </div>
    );
  }
}

export default (HooksPage);
