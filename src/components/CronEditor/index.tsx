import { useState } from 'react';
import { Cron } from 'react-js-cron';
import 'react-js-cron/dist/styles.css';
import local from './local';

interface CronEditorProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function CronEditor({
  value = '0 10-19 * * 1-5',
  onChange = () => {},
}: CronEditorProps) {
  return (
    <div style={{ whiteSpace: 'nowrap' }}>
      <Cron value={value} setValue={onChange} locale={local}></Cron>
    </div>
  );
}
