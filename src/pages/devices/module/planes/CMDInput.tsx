import ProCard from '@ant-design/pro-card';
import { Col, Input, List, Spin } from 'antd';
import { useState } from 'react';
import { runCmd } from '../services';
import { useDeviceInfo } from '../hooks/useDeviceInfo';
import { colSpan } from '../constants';

interface Result {
  cmd: string;
  value: string;
}

export default function CMDInput() {
  const { id } = useDeviceInfo();
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result[]>([]);

  const runCmdHandler = () => {
    setLoading(true);
    runCmd(id, value)
      .then((res) => {
        setResult((state) => {
          return [{ cmd: value, value: res.data.data }, ...state];
        });
        setValue('');
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Col {...colSpan} lg={24}>
      <ProCard
        title={
          <Spin spinning={loading}>
            <Input
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              placeholder="输入要执行的命令, 回车执行"
              style={{ width: '500px' }}
              onKeyUp={(e) => {
                if (e.code === 'Enter') {
                  runCmdHandler();
                }
              }}
              disabled={loading}
            />
          </Spin>
        }
        type="inner"
        bordered
        size="small"
      >
        <List
          dataSource={result}
          renderItem={(item) => {
            return (
              <List.Item style={{ paddingLeft: 5, paddingRight: 5 }}>
                <List.Item.Meta
                  title={item.cmd}
                  description={
                    <pre>
                      <code dangerouslySetInnerHTML={{ __html: item.value }}></code>
                    </pre>
                  }
                />
              </List.Item>
            );
          }}
        ></List>
      </ProCard>
    </Col>
  );
}
