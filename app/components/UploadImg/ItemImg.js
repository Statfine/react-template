import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Progress, Icon, Modal } from 'antd';

const ImgContent = styled.div`
  border: 1px solid #d9d9d9;
  width: 132px;
  height: 132px;
  border-radius: 4px;
  margin: 12px;
  position: relative;
  cursor: pointer;
  & > .overly {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  &:hover > .overly {
    height: 100%;
    display: flex;
  }
`;

const UploadingContent = styled(ImgContent)`
  border: 1px dashed #d9d9d9;
`;

const Upload = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5px;
`;

const IconClose = styled(Icon)`
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
`;

const ImageImg = styled.img`
  width: 100%;
`;

const Overly = styled.div`
  justify-content: center;
  align-items: center;
  i {
    height: 14px;
    width: 14px;
    cursor: pointer;
    color: #fff;
    margin: 0 5px;
  }
`;

export default class ItemImg extends PureComponent {
  state = {
    previewVisible: false,
  };

  handleShowImage = () => {
    const { handleShow, defalteShow } = this.props;
    if (defalteShow) this.setState({ previewVisible: true });
    if (handleShow) handleShow({...this.props})
  }

  renderUploading = () => {
    const { progress, handleCancel, style, className } = this.props;
    return (
      <UploadingContent
        style={style}
        className={className}
      >
        <Upload>
          <p>文件上传中</p>
          <Progress percent={progress} />
        </Upload>
        <IconClose type="close" onClick={() => handleCancel({...this.props})} />
      </UploadingContent>
    )
  }

  render() {
    const { previewVisible } = this.state;
    const { uploading, src, handleShow, defalteShow, handleDelete, style, className } = this.props;
    if (uploading) return this.renderUploading();
    return (
      <ImgContent
        style={style}
        className={className}
      >
        <ImageImg src={src} />
        <Overly className="overly">
          {(handleShow || defalteShow) && <Icon type="eye" onClick={this.handleShowImage} />}
          {handleDelete && <Icon type="delete" onClick={() => handleDelete({...this.props})} />}
        </Overly>
        <Modal visible={previewVisible} footer={null} onCancel={() => this.setState({ previewVisible: false })}>
          <img alt="example" style={{ width: '100%' }} src={src} />
        </Modal>
      </ImgContent>
    );
  }
}

/*
 * className 类名
 * style 样式
 * uploading 上传中
 * progress 上传进度
 * src 图片地址
 * defalteShow 默认预览
 * handleShow 预览事件
 * handleDelete   删除事件
 * handleCancel 取消事件
 */

ItemImg.defaultProps = {
  uploading: false,
};

ItemImg.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  uploading: PropTypes.bool,
  progress: PropTypes.number,
  src: PropTypes.string,
  defalteShow: PropTypes.bool,
  handleShow: PropTypes.func,
  handleDelete: PropTypes.func,
  handleCancel: PropTypes.func,
};
