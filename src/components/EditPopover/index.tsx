import { Input, Popconfirm, PopconfirmProps } from 'antd';
import { useEffect, useState } from 'react';

interface EditPopoverProps extends Omit<PopconfirmProps, 'onConfirm'> {
  value?: string;
  onConfirm?: (value: string) => void;
  inputStyle?: React.CSSProperties;
}

export default function EditPopover({
  value = '',
  inputStyle,
  onConfirm,
  ...props
}: EditPopoverProps) {
  const [val, setVal] = useState(value);
  useEffect(() => {
    if (value && !val) {
      setVal(value);
    }
  }, [value]);
  return (
    <Popconfirm
      {...props}
      icon={false}
      description={
        <>
          <Input
            style={{ marginLeft: -14, ...inputStyle }}
            value={val}
            onChange={(e) => {
              setVal(e.target.value);
            }}
          />
        </>
      }
      onConfirm={() => {
        onConfirm?.(val);
      }}
    />
  );
}
