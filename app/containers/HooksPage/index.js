/**
 *
 * HooksPage
 *
 */

import React from 'react';
import HooksUseStateCom from './HooksUseStateCom';
import HooksUseEffectCom from './HooksUseEffectCom';
import HooksContextCom from './HooksContextCom';

import ThemeContext from './ThemeContext';

/* eslint-disable react/prefer-stateless-function */
export class HooksPage extends React.PureComponent {
  state = {
    show: 1,
    userId: 1,
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

  render() {
    const { show, userId } = this.state;
    return (
      <div>
        <h1>HooksPage</h1>
        <HooksUseStateCom info={{ name: 1 }} />
        <div onClick={() => this.setState({ show: show === 1 ? 0 : 1})}>{show ? 'hidden' : 'show'}</div>
        {this.renderUseEffect(show, userId)}
        {this.renderContext()}
      </div>
    );
  }
}

export default (HooksPage);
