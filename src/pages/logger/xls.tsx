import { AIP_FIX } from '@/constants';

export default function Devices() {
  return (
    <>
      <div style={{ margin: '-15px' }}>
        <iframe
          src={`${AIP_FIX}/log/GetOperationLogDownload`}
          frameBorder="0"
          style={{ width: '100%', height: 'calc(100vh - 3px)' }}
        />
      </div>
    </>
  );
}
