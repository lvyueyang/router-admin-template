import { ProCard } from '@ant-design/pro-components';
import { Col, Input, Space } from 'antd';
import { colSpan, cardProps } from '../constants';
import { useDeviceInfo } from '../hooks/useDeviceInfo';
import { DragUpload } from '../components/DragUpload';
import { useState } from 'react';

export default function UploadFile() {
  const { info, id } = useDeviceInfo();
  const [customPath, setCustomPath] = useState('');

  if (!info) return null;

  return (
    <Col {...colSpan} lg={24}>
      <ProCard
        {...cardProps}
        title={
          <Space>
            <span>自定义上传文件</span>
            <Input
              style={{ width: 300 }}
              placeholder="请输入要上传的目标路径"
              value={customPath}
              onChange={(e) => {
                setCustomPath(e.target.value.trim());
              }}
            />
          </Space>
        }
      >
        <DragUpload id={id!} path={customPath} />
      </ProCard>
    </Col>
  );
}
