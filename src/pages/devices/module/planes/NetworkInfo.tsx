import { ProCard } from '@ant-design/pro-components';
import {
  Alert,
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  ModalProps,
  Popconfirm,
  Space,
  Statistic,
} from 'antd';
import { colSpan, cardProps } from '../constants';
import { useEffect, useState } from 'react';
import { updateIpGateWay } from '../services';
import { useThemeToken } from '@/hooks/useThemeToken';
import CopyIcon from '@/components/CopyIcon';
import { useDeviceInfo } from '../hooks/useDeviceInfo';

interface FormValues {
  ip: string;
  gateway: string;
}
interface IpUpdateModalProps extends ModalProps {
  id: string;
  data: FormValues;
  onCancel?: () => void;
  onComplete?: () => void;
}

function IpUpdateModal({ id, data, onComplete, ...props }: IpUpdateModalProps) {
  const [form] = Form.useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const submitHandler = () => {
    form.validateFields().then(() => {
      setLoading(true);
      const values = form.getFieldsValue();
      updateIpGateWay({
        host_name: id,
        new_ip: values.ip,
        new_gateway: values.gateway,
      })
        .then(() => {
          props.onCancel?.();
          message.success('修改成功，设备将会重启');
          onComplete?.();
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };
  useEffect(() => {
    if (!props.open) return;
    form.setFieldsValue({
      ip: data.ip,
      gateway: data.gateway,
    });
  }, [props.open]);
  return (
    <Modal
      {...props}
      title="网关与 IP 地址修改"
      okButtonProps={{ loading }}
      footer={
        <Space>
          <Button onClick={props.onCancel}>取消</Button>
          <Popconfirm
            title="修改 IP 与网关地址会使设备重启，确定要修改吗？"
            onConfirm={submitHandler}
          >
            <Button type="primary">确定</Button>
          </Popconfirm>
        </Space>
      }
    >
      <br />
      <Form<FormValues> form={form} labelCol={{ span: 4 }}>
        <Form.Item label="IP 地址" name="ip" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="网关" name="gateway" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Alert
          message="注意！请和您的网络管理员确认网关和 IP 在同一网段且和管理平台是连通的！否则修改后将会导致无法连接。"
          type="warning"
        />
      </Form>
    </Modal>
  );
}

export default function NetworkInfo() {
  const { info, id } = useDeviceInfo();
  const [ipModal, setIpModal] = useState({
    open: false,
    data: {
      ip: '',
      gateway: '',
    },
  });
  const { colorSuccess, colorError } = useThemeToken();

  if (!info || !id) return null;

  return (
    <Col {...colSpan} lg={24}>
      <ProCard
        {...cardProps}
        title="网络"
        extra={
          <Button
            type="primary"
            ghost
            onClick={() => {
              setIpModal((state) => ({
                ...state,
                open: true,
                data: {
                  ...state.data,
                  ip: info?.ip || '',
                  gateway: info?.gateway_ip || '',
                },
              }));
            }}
          >
            网关与 IP 地址修改
          </Button>
        }
      >
        <ProCard>
          <Statistic
            title="通断状态"
            value={info?.ip ? '已连接' : '已断开'}
            valueStyle={{ color: info?.ip ? colorSuccess : colorError }}
          />
        </ProCard>
        <ProCard.Divider />
        <ProCard>
          <Statistic
            title={
              <>
                IP 地址 <CopyIcon value={info?.ip || ''} />
              </>
            }
            value={info?.ip}
          ></Statistic>
        </ProCard>
        <ProCard.Divider />
        <ProCard>
          <Statistic
            title={
              <>
                网关地址 <CopyIcon value={info?.gateway_ip || ''} />
              </>
            }
            value={info?.gateway_ip || '-'}
          />
        </ProCard>
      </ProCard>
      <IpUpdateModal
        open={ipModal.open}
        id={id}
        data={ipModal.data}
        onCancel={() => {
          setIpModal((state) => ({
            ...state,
            open: false,
          }));
        }}
      />
    </Col>
  );
}
