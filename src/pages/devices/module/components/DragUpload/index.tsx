import { InboxOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import { message, Upload } from 'antd';
import { useState } from 'react';
import { runCmd, uploadFile } from '../../services';

const { Dragger } = Upload;

interface DragUploadProps {
  id: string;
  path: string;
  title?: string;
  desc?: string;
}

export function DragUpload({
  id,
  path,
  title = '单击或拖动文件到此区域以上传',
  desc,
}: DragUploadProps) {
  return (
    <Dragger
      name="file"
      maxCount={1}
      customRequest={({ file, onError, onProgress, onSuccess }) => {
        console.log(file);
        uploadFile(id, path, file, onProgress)
          .then((res) => {
            onSuccess?.(res.data.data);
            message.success('上传成功');
          })
          .catch(onError);
        return {
          abort() {
            console.log('abort');
          },
        };
      }}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">{title}</p>
      <p className="ant-upload-hint">{desc}</p>
    </Dragger>
  );
}
