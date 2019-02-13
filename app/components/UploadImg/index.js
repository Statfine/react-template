import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import uploadFile from 'utility/uploadUtils';
import uploadImageFile from 'utility/uploadImageUtils';
import uploadVideoUtils from 'utility/uploadVideoUtils';
import { testFileNameImg, guid } from 'utility/verification';
import styled from 'styled-components';
import { Icon, Modal, message } from 'antd';
import _ from 'lodash';
import ItemImg from './ItemImg';

const ContentDiv = styled.div`
  display: flex;
  width: 492px;
  border:1px solid rgba(217,217,217,1);
`;

const UplaodInput = styled.div`
  border: 1px solid #d9d9d9;
  width: 132px;
  height: 132px;
  border-radius: 4px;
  margin: 12px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default class UploadImg extends PureComponent {
  // { fileId, uploading, progress, src }
  state = {
    showObj: {},
    previewVisible: false,
  };

  // 视频文件上传
  handleUploadVideo = (e) => {
    e.preventDefault();
    const { fileList } = this.props;
    const file = [...e.target.files];
    const uploadList = file.map((item) => {
      const fileId = guid();
      const uplaodobj = uploadVideoUtils(
        item,
        '/files/image/upload',
        (res) => this.handleUploadPending(res, fileId),
        (fileObj, res) => this.handleUploadSuc(fileObj, res, fileId),
        (error) => this.handleUploadError(error, fileId),
      );
      return { fileId, uploading: true, progress: 0, src: '', uplaodobj };
    });
    this.props.handleChange(fileList.concat(uploadList));
  };

  // 文件上传
  handleUploadImages = (e) => {
    e.preventDefault();
    const { maxLength, fileList } = this.props;
    const file = [...e.target.files];
    if (file.length === 0) {
      return;
    }
    if (file.length > maxLength) {
      message.error('已超出最大文件个数');
      return;
    }
    if (file.length + fileList.length > maxLength) {
      message.error(`您还可以上传${maxLength - fileList.length}张图片`);
      return;
    }
    const result = file.some((item) => !testFileNameImg(item.name));
    if (result) {
      message.error('包含不支持的图片格式');
      return;
    }
    const uploadList = file.map((item) => {
      const fileId = guid();
      // const uplaodobj = uploadFile(
      //   item,
      //   '/mam/createuploadurl',
      //   { type: 'image' },
      //   (fileObj, res) => this.handleUploadSuc(fileObj, res, id),
      //   (error) => this.handleUploadError(error, id),
      //   {
      //     contentType: 'png',
      //     ext: 'png',
      //     callback: false,
      //   },
      //   (res) => this.handleUploadPending(res, id),
      // );
      const uplaodobj = uploadImageFile(
        item,
        '/files/image/upload',
        (res) => this.handleUploadPending(res, fileId),
        (fileObj, res) => this.handleUploadSuc(fileObj, res, fileId),
        (error) => this.handleUploadError(error, fileId),
      );
      return { fileId, uploading: true, progress: 0, src: '', uplaodobj };
    });
    this.props.handleChange(fileList.concat(uploadList));
  };

  // 成功回调
  handleUploadSuc = (fileObj, res, fileId) => {
    console.log('handleUploadSuc', fileObj, res, fileId);
    const uploadList = [...this.props.fileList];
    const obj = this.handleGetArrayIndex(fileId);
    uploadList[obj.index] = _.merge(obj.item, {uploading: false, progress: 100, ...res } );
    this.props.handleChange(uploadList);
    if (this.props.sucCb) this.props.sucCb({ fileId, res });
  };

  // 失败回调
  handleUploadError = (error, fileId) => {
    console.log('handleUploadError', error, fileId);
    const uploadList = [...this.props.fileList];
    const obj = this.handleGetArrayIndex(fileId);
    uploadList.splice(obj.index, 1);
    this.props.handleChange(uploadList);
  };

  // 上传中回调
  handleUploadPending = ({ progress }, fileId) => {
    console.log('handleUploadPending', progress, fileId);
    const uploadList = [...this.props.fileList];
    const obj = this.handleGetArrayIndex(fileId);
    uploadList[obj.index] = _.merge(obj.item, {progress: 100} );
    this.props.handleChange(uploadList);
  };

  handleGetArrayIndex = (fileId) => {
    const { fileList } = this.props;
    const index = fileList.findIndex((e)=>(e.fileId === fileId));
    return { index, item: fileList[index] };
  }

  handleShow = (obj) => {
    this.setState({ showObj: obj, previewVisible: true });
  }

  handleCancel = (obj) => {
    console.log('handleCancel', obj);
    obj.uplaodobj.cancel();
  }

  render() {
    const { previewVisible, showObj } = this.state;
    const { fileList, style, className, itemStyle, handleDelete } = this.props; 
    return (
      <ContentDiv
        style={style}
        className={className}
      >
        {
          fileList.map((item) => (
            <ItemImg
              style={itemStyle}
              key={item.fileId}
              {...item}
              defalteShow
              handleDelete={handleDelete}
              handleCancel={this.handleCancel}
            />
          ))
        }
        <UplaodInput onClick={() => this.fileInputEl.click()}>
          <Icon style={{ fontSize: '36px', marginBottom: '10px' }} type="plus" />
          <p>上传</p>
        </UplaodInput>
        <Modal visible={previewVisible} footer={null} onCancel={() => this.setState({ previewVisible: false })}>
          <img alt="example" style={{ width: '100%' }} src={showObj.src} />
        </Modal>
        <input
          type="file"
          multiple
          style={{ display: 'none' }}
          ref={(el) => (this.fileInputEl = el)}
          onChange={(e) => {
            this.handleUploadImages(e);
            // this.handleUploadVideo(e);
            this.fileInputEl.value = '';
          }}
        />
      </ContentDiv>
    );
  }
}

// UploadImg.defaultProps = {

// };

/*
 * maxLength 最大图片个数
 * className 类名
 * style 样式
 * itemStyle 卡片样式
 * fileList [{ id, src }]
 * sucCb  成功回调
 * handleChange  季度状态回调
 * handleDelete 删除事件
 */

ItemImg.defaultProps = {
  maxLength: 9,
};

UploadImg.propTypes = {
  maxLength: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
  itemStyle: PropTypes.object,
  fileList: PropTypes.array,
  sucCb: PropTypes.func,
  handleChange: PropTypes.func,
  handleDelete: PropTypes.func,
};
