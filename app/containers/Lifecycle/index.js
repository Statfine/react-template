import React from 'react';

export default class Lifecycle extends React.PureComponent {
  state = {};

  componentDidMount() {
    // 执行初始请求
  }

  static getDerivedStateFromProps(props, state) {
    // 根据最新的props和state对比，返回state
    return state;
  }

  // eslint-disable-next-line no-unused-vars
  getSnapshotBeforeUpdate(prevProps) {
    // 对比最新的props(this.props) 和 之前的preProps返回判断条件
    // 返回值是componentDidUpdate的第三个参数
    // if (this.props.visible && prevProps.visible !== this.props.visible) {
    //   return true;
    // }
    return false;
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    // 判断是否执行方法
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    // if (snapshot === true) {
    //   this.fetchList();
    // }
  }
}