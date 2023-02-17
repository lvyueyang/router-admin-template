import { Link } from 'umi';
import Devices from '../devices';

export default function DeviceLog() {
  return (
    <Devices
      operateRender={(row) => {
        return <Link to={`/logger/device/${row.mac_add_str}`}>查看日志</Link>;
      }}
    />
  );
}
