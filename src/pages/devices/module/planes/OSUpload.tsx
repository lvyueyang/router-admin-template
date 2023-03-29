import { ProCard } from '@ant-design/pro-components';
import { Col } from 'antd';
import { colSpan, cardProps } from '../constants';
import { useDeviceInfo } from '../hooks/useDeviceInfo';
import { DragUpload } from '../components/DragUpload';

export default function OSUpload() {
  const { info, id } = useDeviceInfo();
  if (!info) return null;

  return (
    <Col {...colSpan} lg={24}>
      <ProCard {...cardProps} title="系统升级">
        <DragUpload
          id={id}
          path="/opt"
          update_type="upgrade_system"
          desc="请上传符合要求的系统镜像文件，上传完毕后将会开始升级"
        />
      </ProCard>
    </Col>
  );
}
