import ProCard from '@ant-design/pro-card';
import { Input, List, Spin } from 'antd';
import { useState } from 'react';
import { runCmd } from '../../services';

interface Result {
  cmd: string;
  value: string;
}

export function CmdInput({ id }: { id?: string }) {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result[]>([]);
  const runCmdHandler = () => {
    if (!id) return;
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
  );
}
