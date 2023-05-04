import { Select, SelectProps } from 'antd';
import { useEffect, useState } from 'react';
interface SelectDevicesProps extends SelectProps {
  isRaid: boolean;
  deviceTotal: number;
}

interface OptionItem {
  value: string;
  label: string;
}

function calcSelectOptions(isRaid: boolean, total: number) {
  let min = 2;
  let max = 8;
  if (isRaid) {
    const m = total / 2;
    if (m >= 8) {
      max = 8;
    } else {
      max = m;
    }
  } else {
    const m = (total * 4) / 2;
    if (m >= 16) {
      max = 16;
    } else {
      max = m;
    }
  }
  return { max, min };
}

export function ECSelect({ isRaid, deviceTotal, ...props }: SelectDevicesProps) {
  const [options, setOptions] = useState<OptionItem[]>([]);

  useEffect(() => {
    const { min, max } = calcSelectOptions(isRaid, deviceTotal);
    const opt: OptionItem[] = [];
    for (let i = min; i <= max; i++) {
      const value = `EC:${i}`;
      opt.push({
        value,
        label: value,
      });
    }
    setOptions(opt);
  }, [isRaid, deviceTotal]);
  return <Select {...props} options={options}></Select>;
}
