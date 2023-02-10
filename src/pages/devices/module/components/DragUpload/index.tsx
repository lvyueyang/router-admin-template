import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { uploadFile } from '../../services';
import { UpdateFileBody } from '../../types';

const { Dragger } = Upload;

interface DragUploadProps {
  id: string;
  path: string;
  title?: string;
  desc?: string;
  update_type?: UpdateFileBody['update_type'];
}

export function DragUpload({
  id,
  path,
  title = '单击或拖动文件到此区域以上传',
  desc,
  update_type,
}: DragUploadProps) {
  return (
    <Dragger
      name="file"
      maxCount={1}
      customRequest={({ file, onError, onProgress, onSuccess }) => {
        uploadFile({
          mac_address: id,
          path,
          file,
          update_type,
          onUploadProgress: onProgress,
        })
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
