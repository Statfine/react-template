import axios from 'axios';
import { API_BASE } from 'common/constants';

/**
 * @params
 * file 文件
 * url 上传地址
 * callBackSuc 成功回调
 * callBackProgress 拿到进度 可选
 * callBackError 失败回调
 * options 上传设置选项
 * {
 *    ext: string //上传文件类型
 *    contentType: string //上传设置Header的Content-Type
 *    callback: bool //是否上传回调服务器 默认为true
 * }
 * 返回fileObj
 * fileObj.cancel()取消上传。
 */

export default function uploadCli(
  file,
  url,
  params,
  callBackSuc,
  callBackError,
  options,
  callBackProgress
) {
  //  判断文件类型获取文件名
  const fileName = file.name.substring(0, file.name.lastIndexOf('.'));
  let fileExtension;
  let contentType;
  if (options.ext) {
    fileExtension = options.ext;
  } else {
    fileExtension = file.name
      .split('.')
      .pop()
      .toLowerCase();
  }
  if (options.contentType) {
    contentType = options.contentType;
  } else {
    contentType = fileExtension;
  }

  //  创建请求对象
  const instance = axios.create({
    headers: {
      Authorization: `Bearer ${global.window.localStorage.access_token}`,
    },
  });

  //  上传文件对象
  const fileObj = { name: fileName };

  // 获取上传URL
  function getUploadUrl() {
    const name = encodeURIComponent(fileName);
    return instance.get(
      `${API_BASE}${url}?ext=${fileExtension}&filename=${name}`,
      { params }
    );
  }

  function uploadUrling(url1) {
    const uploadInstance = axios.create();
    const CancelToken = axios.CancelToken;
    const config = {
      //  获取上传进度
      onUploadProgress: (progressEvent) => {
        fileObj.progress = (
          parseInt(progressEvent.loaded) /
          parseInt(progressEvent.total) *
          100
        ).toFixed(0);
        if (typeof callBackProgress === 'function') {
          callBackProgress(fileObj, progressEvent);
        }
      },
      cancelToken: new CancelToken((c) => {
        fileObj.cancel = c;
      }),
      headers: {
        'Content-Type': contentType,
      },
    };
    return uploadInstance.put(url1, file, config);
  }

  function oosCallBack(url1, src) {
    instance
      .post(url1, { src })
      .then((response) => {
        callBackSuc(fileObj, response);
      })
      .catch((error) => {
        callBackError(error, fileObj);
      });
  }

  let callBackURl;
  let src;
  getUploadUrl()
    .then((response) => {
      fileObj.video_id = response.data.data.id;
      fileObj.audio_id = response.data.data.audio_id;
      callBackURl = response.data.data.callback;
      src = response.data.data.src;
      fileObj.src = response.data.data.src;
      return uploadUrling(response.data.data.url);
    })
    .then((response) => {
      if (!options.callback) {
        oosCallBack(callBackURl, src);
      } else {
        callBackSuc(fileObj, response);
      }
    })
    .catch((error) => {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
        callBackError(error, fileObj);
      } else {
        // handle error
        callBackError(error, fileObj);
      }
    });
  return fileObj;
}
